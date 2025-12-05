import React, { useEffect, useState } from "react";
import StaffTimetableModal from "./StaffTimetableModal";
import { BACKEND_URL } from "../../utils/util";

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}api/staff/all`)
      .then((res) => res.json())
      .then((data) => setStaff(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Staff Details</h1>

      <table className="w-full border-collapse rounded-xl shadow-lg bg-white">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3">Staff ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Department</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s._id} className="hover:bg-gray-100 transition">
              <td className="p-3">{s.staffId}</td>
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.department}</td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedStaff(s)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  View Timetable
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStaff && (
        <StaffTimetableModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
        />
      )}
    </div>
  );
};

export default StaffTable;
