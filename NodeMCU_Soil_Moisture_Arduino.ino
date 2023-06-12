#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <SoftwareSerial.h>
#include <TimeLib.h>

#define moistureSensor A0
// #define temperatureSensor A1
#define waterPump D3

// Replace with your network credentials
const char* ssid = "";
const char* password = "";

// Replace with your Google app script id
String sheet_id = "AKfycbzImhI5tpPS3kZLSqDMdjRQPzd2TBP5pKzolDi6FGHcJLijD8P7m9qmVjExvFz_65Dkdw";

const char* host = "script.google.com";
const int httpsPort = 443;

WiFiClientSecure client;

unsigned long previousDataTime = 0;
const unsigned long dataInterval = 1000; // 1 sec delay for sending data

void setup() {
  Serial.begin(115200);
  pinMode(waterPump, OUTPUT);
  digitalWrite(waterPump, LOW);

  connectToWiFi();
  setTime(0, 0, 0, 1, 1, 2023); // Set initial time (hours, minutes, seconds, day, month, year)
}

void loop() {
  unsigned long currentMillis = millis();

  int moistureValue = analogRead(moistureSensor);
  // int temperatureValue = analogRead(temperatureSensor);

  float moisturePercentage = map(moistureValue, 0, 1024, 0, 100);
  moisturePercentage = (moisturePercentage - 100) * -1;

  // float temperature = map(temperatureValue, 0, 1024, 0, 500);
  // temperature = temperature / 10.0;

  Serial.print("Moisture: ");
  Serial.print(moisturePercentage);
  Serial.println("%");

  // Serial.print("Temperature: ");
  // Serial.print(temperature);
  // Serial.println("°C");

  bool pumpStatus = false;
  
  if (moisturePercentage < 10) {
    digitalWrite(waterPump, HIGH);
    Serial.println("Pump is ON");
    pumpStatus = true;
  } else {
    digitalWrite(waterPump, LOW);
    Serial.println("Pump is OFF");
    pumpStatus = false;
  }

  if (currentMillis - previousDataTime >= dataInterval) {
    
    sendSensorDataToGoogleSheets(moisturePercentage, pumpStatus);
    previousDataTime = currentMillis;
  }
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Successfully connected to : ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  client.setInsecure();
}

void sendSensorDataToGoogleSheets(float moisture, bool pumpStatus) {
  Serial.println("==========");
  Serial.print("connecting to ");
  Serial.println(host);
  
  //----------------------------------------Connect to Google host
  if (!client.connect(host, httpsPort)) {
    Serial.println("connection failed");
    return;
  }
  //----------------------------------------

  //----------------------------------------Processing data and sending data
  String string_moisture =  String(moisture);
  // String string_temperature =  String(tem, DEC); 
  String pump_status =  String(pumpStatus); 
  String url = "/macros/s/" + sheet_id + "/exec?moisture=" + string_moisture + "&pump_status=" + pump_status;
  Serial.print("requesting URL: ");
  Serial.println(url);

  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
         "Host: " + host + "\r\n" +
         "User-Agent: BuildFailureDetectorESP8266\r\n" +
         "Connection: close\r\n\r\n");

  Serial.println("request sent");
  while (client.connected()) {
    String line = client.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("headers received");
      break;
    }
  }
  String line = client.readStringUntil('\n');
  if (line.startsWith("{\"state\":\"success\"")) {
    Serial.println("esp8266/Arduino CI successfull!");
  } else {
    Serial.println("esp8266/Arduino CI has failed");
  }
  Serial.print("reply was : ");
  Serial.println(line);
  Serial.println("closing connection");
  Serial.println("==========");
  Serial.println();
}
