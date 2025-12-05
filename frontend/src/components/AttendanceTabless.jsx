import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AttendanceTable = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [subject, setSubject] = useState("");

  const today = new Date();
  const date = today.toLocaleDateString("en-IN");
  const day = today.toLocaleDateString("en-IN", { weekday: "long" });

  useEffect(() => {
    axios
      .get("/api/students")
      .then((res) => setStudents(res.data))
      .catch(() => toast.error("Failed to fetch students"));
  }, []);

  const handleStatus = (regNo, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [regNo]: { ...prev[regNo], Status: status },
    }));
  };

  const handleSubmit = async () => {
    if (!subject) return toast.error("Please enter subject");

    const records = students.map((student) => ({
      Reg_no: student.Reg_no,
      Name: student.Name,
      Class: student.Class,
      Department: student.Department,
      Status: attendanceData[student.Reg_no]?.Status || "Absent",
      Date: date,
      Day: day,
      Subject: subject,
      Photo: student.image || "",
    }));

    try {
      await axios.post("/api/attendance", records);
      toast.success("Attendance submitted!");
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📋 Student Attendance
        </h2>

        <div className="mb-6 flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter Subject (e.g., Physics)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="text-gray-500 text-sm">
            {day}, {date}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table
            border={"2"}
            className="min-w-full bg-white border rounded-lg overflow-hidden"
          >
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Photo</th>
                <th className="p-3 text-left text-sm font-semibold">Reg No</th>
                <th className="p-3 text-left text-sm font-semibold">Name</th>
                <th className="p-3 text-left text-sm font-semibold">Class</th>
                <th className="p-3 text-left text-sm font-semibold">
                  Department
                </th>
                <th className="p-3 text-center text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.Reg_no} className="hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={student.image}
                      alt={student.Name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="p-3 text-sm">{student.Reg_no}</td>
                  <td className="p-3 text-sm">{student.Name}</td>
                  <td className="p-3 text-sm">{student.Class}</td>
                  <td className="p-3 text-sm">{student.Department}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleStatus(student.Reg_no, "Present")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        attendanceData[student.Reg_no]?.Status === "Present"
                          ? "bg-green-500 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatus(student.Reg_no, "Absent")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        attendanceData[student.Reg_no]?.Status === "Absent"
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
