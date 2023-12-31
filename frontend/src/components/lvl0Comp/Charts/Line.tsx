import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PlantDataArray } from "../../../types/arduinoData";

export default function LineChart({ moistureData }: { moistureData: PlantDataArray }) {
  dayjs.extend(localizedFormat);
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Soil Moisture"
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
        label: "Soil Moisture",
        data: moistureData?.documents?.map((data) => data.moisture),
        borderColor: "rgba(92, 241, 6)",
        backgroundColor: "rgba(142, 240, 85, 0.8)"
      }
    ]
  };
  return (
    <section className="mb-12">
      <Line options={options} data={data} />
    </section>
  );
}
