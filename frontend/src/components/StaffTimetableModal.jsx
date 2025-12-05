import React from "react";

const StaffTimetableModal = ({ staff, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200
 flex justify-center items-center p-3"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">{staff.name} — Timetable</h2>

          <button
            onClick={onClose}
            className="text-red-600 text-lg font-semibold"
          >
            ✕
          </button>
        </div>

        {/* modern timetable design */}
        <div className="space-y-6">
          {staff.timetable.map((day) => (
            <div
              key={day.dayOrder}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <h3 className="font-bold text-lg mb-3">
                Day Order {day.dayOrder}
              </h3>

              <table className="w-full border-collapse text-center">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 border">Hour</th>
                    <th className="p-2 border">Subject</th>
                    <th className="p-2 border">Class</th>
                    <th className="p-2 border">Room</th>
                  </tr>
                </thead>

                <tbody>
                  {day.hours.map((hr, index) => (
                    <tr key={index} className="hover:bg-blue-50">
                      <td className="p-2 border font-semibold">{hr.hour}</td>
                      <td className="p-2 border">{hr.subject}</td>
                      <td className="p-2 border">{hr.className}</td>
                      <td className="p-2 border">{hr.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffTimetableModal;
