#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <TimeLib.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#define moistureSensor A0
// #define temperatureSensor A1
#define waterPump D3

// Replace with your network credentials
const char* ssid = "";
const char* password = "";

// Replace with your Appwrite details
const char* endpoint = "cloud.appwrite.io";
const int httpsPort = 443;
const char* project = "";
const char* functionId = "";
const char* appwriteKey = "";

BearSSL::WiFiClientSecure client;

unsigned long previousDataTime = 0;
unsigned long totalPumpedWater = 0;
unsigned long pumpedWater = 0;
unsigned long pumpStartTime = 0;
const unsigned long dataInterval = 1000; // 1 sec delay for sending data
const unsigned long maxWaterLimit = 3000; // 3 L of water

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "in.pool.ntp.org", 19800); // Indian NTP server, UTC+5:30

void setup() {
  Serial.begin(115200);
  pinMode(waterPump, OUTPUT);
  digitalWrite(waterPump, LOW);

  connectToWiFi();
  setTime(getNtpTime()); // Set initial time to NTP synchronized time

  // Update NTP time every hour
  timeClient.begin();
  timeClient.update();
}

void loop() {
  unsigned long currentMillis = millis();
  int currentHourOfDay = hour();

  if (currentHourOfDay >= 19) {
    // Reset totalPumpedWater to zero after 7 PM
    totalPumpedWater = 0;
  }

  int moistureValue = analogRead(moistureSensor);
  float moisturePercentage = map(moistureValue, 0, 1024, 0, 100);
  moisturePercentage = (moisturePercentage - 100) * -1;

  Serial.print("Moisture: ");
  Serial.print(moisturePercentage);
  Serial.println("%");

  bool pumpStatus = false;

  if (moisturePercentage >= 0 && moisturePercentage <= 90 && totalPumpedWater < maxWaterLimit && currentHourOfDay >= 7 && currentHourOfDay < 19) {
    digitalWrite(waterPump, HIGH);
    Serial.println("Pump is ON");
    pumpStatus = true;
  } else {
    digitalWrite(waterPump, LOW);
    Serial.println("Pump is OFF");
    pumpStatus = false;
  }

  if (pumpStatus) {
    unsigned long elapsedTime = currentMillis - pumpStartTime;
    pumpedWater = elapsedTime / 1000 * 28; // 28ml per second
    totalPumpedWater += pumpedWater;
    pumpStartTime = currentMillis;
    Serial.print("Pumped Water: ");
    Serial.print(totalPumpedWater);
    Serial.println("ml");
  } else {
    pumpStartTime = 0;
    pumpedWater = 0;
  }

  if (currentMillis - previousDataTime >= dataInterval) {
    sendSensorData(moisturePercentage, pumpStatus);
    previousDataTime = currentMillis;
  }
  Serial.print("Hour Of the Day: ");
  Serial.print(currentHourOfDay);
  Serial.println("Hrs");
  delay(3000);
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Successfully connected to: ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  client.setInsecure();
}

time_t getNtpTime() {
  while (!timeClient.update()) {
    timeClient.forceUpdate();
    delay(10);
  }
  return timeClient.getEpochTime();
}

void sendSensorData(float moisture, bool pumpStatus) {
  client.setInsecure();

  if (!client.connect(endpoint, httpsPort)) {
    Serial.println("Connection failed");
    return;
  }

  String url_path = "/v1/functions/" + String(functionId) + "/executions";

  StaticJsonDocument<200> jsonDocument;
  jsonDocument["data"] = "{\n\"moisture\": " + String(moisture) + ",\n\"pump_status\": " + (pumpStatus ? "true" : "false") + ",\n\"water_intake\": " + String(pumpedWater)+"\n}";
  jsonDocument["async"] = false;
  String requestData;
  serializeJson(jsonDocument, requestData);

  String request = "POST " + url_path + " HTTP/1.1\r\n" +
                   "Host: " + String(endpoint) + "\r\n" +
                   "User-Agent: ESP8266\r\n" +
                   "Content-Type: application/json\r\n" +
                   "Content-Length: " + String(requestData.length()) + "\r\n" +
                   "X-Appwrite-Project: " + String(project) + "\r\n" +
                   "X-Appwrite-Key: " + String(appwriteKey) + "\r\n" +
                   "Connection: close\r\n\r\n" +
                   requestData + "\r\n";

  client.print(request);

  unsigned long timeout = millis() + 5000; // 5 seconds timeout
  while (client.connected() && !client.available() && millis() < timeout) {
    delay(1);
  }

  if (client.available()) {
    while (client.available()) {
      String line = client.readStringUntil('\r');
      Serial.print(line);
    }
  } else {
    Serial.println("No response received");
  }

  client.stop();
}
