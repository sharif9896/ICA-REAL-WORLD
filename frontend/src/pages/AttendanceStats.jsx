import { useState } from "react";
import { BACKEND_URL } from "../../utils/util";

export default function AttendanceStats() {
  const [regNo, setRegNo] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    const res = await fetch(`${BACKEND_URL}api/attendance/stats/${regNo}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    if (status === "REDO") return "bg-red-500 text-white";
    if (status === "DETAIN") return "bg-yellow-500 text-black";
    return "bg-green-600 text-white";
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Attendance Checker</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Register Number"
          className="border p-3 w-full rounded-md"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        <button
          onClick={fetchStats}
          className="bg-blue-600 text-white px-4 rounded-md"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}

      {data && (
        <div className="border p-5 rounded-xl shadow-lg bg-white">
          <h3 className="text-xl font-semibold mb-3">Attendance Report</h3>

          <p className="text-lg">
            Reg No: <b>{data.Reg_no}</b>
          </p>
          <p className="text-lg">
            Present Days: <b>{data.presentDays}</b>
          </p>
          <p className="text-lg">
            Total Working Days: <b>{data.totalWorkingDays}</b>
          </p>

          <p className="text-lg">
            Attendance %:
            <b className="ml-2">{data.attendancePercentage}%</b>
          </p>

          <p
            className={`mt-4 p-3 rounded-lg text-center text-xl font-bold ${getStatusColor(
              data.status
            )}`}
          >
            {data.status}
          </p>
        </div>
      )}
    </div>
  );
}
