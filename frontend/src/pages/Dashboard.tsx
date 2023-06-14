import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Navbar from "../components/lvl0Comp/Navbar";
import TableResponsive from "../components/lvl0Comp/Table";
import WeatherCard from "../components/lvl0Comp/WeatherCard";
import { useData } from "../context/DataContext";

const Dashboard = () => {
  const { isLoading, isSuccess, isError, error, data } = useData();
  dayjs.extend(localizedFormat);
  console.log(data);
  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl">
        <div className="lg:flex  gap-5 w-full my-8">
          <div className="mt-4 mx-4 lg:mx-0 w-full h-[306px] rounded-xl bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-600 p-0.5 shadow-xl transition hover:shadow-sm">
            <div className="rounded-[10px] bg-white p-4  w-full h-full sm:p-6">
              {/* table */}
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-2xl font-semibold border-l  text-emerald-700 ">
                    Moisture Level
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-2xl font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {data?.documents[0].moisture}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-2xl font-semibold border-l  text-emerald-700 ">
                    Last Watered
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-2xl font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {dayjs(data?.documents[0].$createdAt).format("LT")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-2xl font-semibold border-l  text-emerald-700 ">
                    Last Watered Date
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-2xl font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {dayjs(data?.documents[0].$createdAt).format("MMMM DD, YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 bg-emerald-100">
                  <p className=" p-2 text-2xl font-semibold border-l  text-emerald-700 ">
                    Pump Status
                  </p>
                </div>
                <div className="w-1/2 border-1 border-emerald-400">
                  <p className=" p-2 text-2xl font-semibold border-l border-emerald-200  text-emerald-700 ">
                    {data?.documents[0].pump_status ? "ON" : "OFF"}
                  </p>
                </div>
              </div>
              {/*  */}
            </div>
          </div>

          <WeatherCard />
        </div>
        {isSuccess && <TableResponsive data={data} />}
      </div>
    </main>
  );
};

export default Dashboard;
