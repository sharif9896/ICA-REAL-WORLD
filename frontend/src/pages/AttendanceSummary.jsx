import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/util";

export default function AttendanceSummary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}api/attendance/summary`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const badgeColor = (remark) => {
    switch (remark) {
      case "REDO":
        return "bg-red-600";
      case "DETAIN":
        return "bg-orange-500";
      case "SHORTAGE":
        return "bg-yellow-500";
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3">Photo</th>
              <th className="p-3">Reg No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Department</th>
              <th className="p-3">Present</th>
              <th className="p-3">Total</th>
              <th className="p-3">% Attendance</th>
              <th className="p-3">Remark</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr key={s.Reg_no} className="border-b text-center">
                <td className="p-3">
                  <img
                    src={s.Photo}
                    className="h-12 w-12 rounded-full object-cover mx-auto"
                    alt=""
                  />
                </td>
                <td className="p-3">{s.Reg_no}</td>
                <td className="p-3">{s.Name}</td>
                <td className="p-3">{s.Class}</td>
                <td className="p-3">{s.Department}</td>
                <td className="p-3">{s.presentDays}</td>
                <td className="p-3">{s.totalDays}</td>
                <td className="p-3 font-bold">{s.percentage}%</td>

                <td className="p-3">
                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm font-bold ${badgeColor(
                      s.remark
                    )}`}
                  >
                    {s.remark}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
