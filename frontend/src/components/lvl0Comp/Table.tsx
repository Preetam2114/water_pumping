import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PlantDataArray } from "../../types/arduinoData";

export default function TableResponsive({ data }: { data: PlantDataArray }) {
  dayjs.extend(localizedFormat);

  return (
    <>
      {/*<!-- Component: Responsive Table --> */}
      <table
        className="my-10 w-full text-left border border-separate rounded border-emerald-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-emerald-700 text-emerald-700 bg-emerald-100"
            >
              Date
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-emerald-700 text-emerald-700 bg-emerald-100"
            >
              Time
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-emerald-700 text-emerald-700 bg-emerald-100"
            >
              Moisture
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-emerald-700 text-emerald-700 bg-emerald-100"
            >
              Pump Status
            </th>
          </tr>
          {data?.documents?.map((item) => (
            <tr className="block border-b sm:table-row last:border-b-0 border-emerald-200 sm:border-none">
              <td
                data-th="Name"
                className="before:w-24 before:inline-block before:font-medium before:text-emerald-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-emerald-200 stroke-emerald-500 text-black "
              >
                {dayjs(item?.$createdAt).format("MMMM DD, YYYY")}
              </td>
              <td
                data-th="Title"
                className="before:w-24 before:inline-block before:font-medium before:text-emerald-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-emerald-200 stroke-emerald-500 text-black"
              >
                {dayjs(item?.$createdAt).format("LT")}
              </td>
              <td
                data-th="Company"
                className="before:w-24 before:inline-block before:font-medium before:text-emerald-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-emerald-200 stroke-emerald-500 text-black"
              >
                {item?.moisture}
              </td>
              <td
                data-th="Role"
                className="before:w-24 before:inline-block before:font-medium before:text-emerald-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-emerald-200 stroke-emerald-500 text-black"
              >
                {item?.pump_status ? "ON" : "OFF"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<!-- End Responsive Table --> */}
    </>
  );
}
