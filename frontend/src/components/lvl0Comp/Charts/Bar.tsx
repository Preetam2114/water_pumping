import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { PlantDataArray } from "../../../types/arduinoData";

const BarChart = ({ moistureData }: { moistureData: PlantDataArray }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Pump Status"
      }
    }
  };

  const labels = moistureData?.documents?.map((data) =>
    dayjs(data?.$createdAt).format("DD MMMM, LT")
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Pump Status - 0 OFF, 1 ON",
        data: moistureData?.documents?.map((data) => (data.pump_status ? 1 : 0)),
        backgroundColor: "rgba(142, 240, 85, 0.8)"
      }
    ]
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
