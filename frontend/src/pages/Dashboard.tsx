import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Navbar from "../components/lvl0Comp/Navbar";
import TableResponsive from "../components/lvl0Comp/Table";
import WeatherCard from "../components/lvl0Comp/WeatherCard";
import { useData } from "../context/DataContext";
import LineChart from "../components/lvl0Comp/Charts/Line";
import DoughnutChart from "../components/lvl0Comp/Charts/Doughnut";
import BarChart from "../components/lvl0Comp/Charts/Bar";
import { PlantData } from "../types/arduinoData";

const Dashboard = () => {
  // @ts-expect-error It is not taking props don't know why
  const { isLoading, isSuccess, isError, error, data } = useData();
  dayjs.extend(localizedFormat);

  const soilMoistureSum = data?.documents?.reduce((acc: number, curerntValue: PlantData) => {
    acc += curerntValue.moisture;
    return acc;
  }, 0);

  const waterPumpedSum = data?.documents?.reduce((acc: number, curerntValue: PlantData) => {
    acc += curerntValue.water_intake;
    return acc;
  }, 0);

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl">
        <div className="lg:flex  gap-5 w-full my-8">
          <div className="mt-4  lg:mx-0 w-full h-[306px] lg:rounded-xl bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-600 p-0.5 shadow-xl transition hover:shadow-sm">
            <div className="rounded-[10px] bg-white p-4  w-full h-full sm:p-6">
              {/* table */}
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l  text-emerald-700 ">
                    Soil Moisture Level
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2  text-sm lg:text-lg font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {data?.documents[0].moisture}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2  text-sm lg:text-lg font-semibold border-l  text-emerald-700 ">
                    Last Watered
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {dayjs(data?.documents[0].$createdAt).format("LT")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l  text-emerald-700 ">
                    Last Watered Date
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {dayjs(data?.documents[0].$createdAt).format("MMMM DD, YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l  text-emerald-700 ">
                    Pump Status
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {data?.documents[0].pump_status ? "ON" : "OFF"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l  text-emerald-700 ">
                    Average Soil Moisture
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {soilMoistureSum && data?.total && (soilMoistureSum / 25)?.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l  text-emerald-700 ">
                    Average Water Pumped
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-sm lg:text-lg font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {waterPumpedSum} mL
                  </p>
                </div>
              </div>
              {/*  */}
            </div>
          </div>

          {isSuccess && <DoughnutChart moistureData={data} />}
          {/* <WeatherCard /> */}
        </div>
        {isSuccess && <LineChart moistureData={data} />}
        {isSuccess && <BarChart moistureData={data} />}
        {isSuccess && <TableResponsive data={data} />}
      </div>
    </main>
  );
};

export default Dashboard;
