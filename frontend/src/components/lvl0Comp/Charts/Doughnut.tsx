import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { databases } from "../../../utils/init-appwrite";

import { PlantDataArray } from "../../../types/arduinoData";
const DoughnutChart = ({ moistureData }: { moistureData: PlantDataArray }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // const {
  //   isSuccess,
  //   data: HighestMoistureData,
  //   isError,
  //   error
  // } = useQuery({
  //   queryKey: ["soilData", "highestMoistureVal"],
  //   queryFn: async () => {
  //     const res = await databases.listDocuments("6488522930f583a33d5c", "64885246482c3298bfb5", [
  //       Query.orderDesc("moisture")
  //     ]);
  //     return res;
  //   }
  // });
  // if (isSuccess) {
  //   console.log(HighestMoistureData);
  // }

  // console.log(
  //   moistureData?.documents[0].moisture,
  //   HighestMoistureData?.documents[0].moisture - moistureData?.documents[0].moisture,
  //   isSuccess
  // );

  const data = {
    labels: ["Current Soil Moisture", "Total Moisture"],
    datasets: [
      {
        data: [
          moistureData?.documents[0].moisture,
          // max value - current value
          // HighestMoistureData?.documents[0].moisture - moistureData?.documents[0].moisture
          100 - moistureData?.documents[0].moisture
        ],
        backgroundColor: ["rgba(142, 240, 85, 0.8)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgb(92, 241, 6)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1
      }
    ]
  };

  return <div className="flex flex-col justify-center">{true && <Doughnut data={data} />}</div>;
};

export default DoughnutChart;
