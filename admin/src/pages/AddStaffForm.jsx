import React, { useState } from "react";
import { BACKEND_URL } from "../../utils/util";

const AddStaffForm = () => {
  const initialTimetable = Array.from({ length: 6 }, (_, i) => ({
    dayOrder: i + 1,
    hours: Array.from({ length: 5 }, (_, j) => ({
      hour: j + 1,
      subject: "",
      className: "",
      room: "",
    })),
  }));

  const [staff, setStaff] = useState({
    name: "",
    staffId: "",
    department: "",
    timetable: initialTimetable,
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleTimetableChange = (dayIndex, hourIndex, field, value) => {
    const updated = [...staff.timetable];
    updated[dayIndex].hours[hourIndex][field] = value;
    setStaff({ ...staff, timetable: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BACKEND_URL}api/staff/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staff),
    });

    const data = await res.json();
    alert("Staff Added Successfully!");
    console.log(data);
  };

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Staff Details</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-xl rounded-2xl p-8 border"
      >
        {/* Staff Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="font-semibold">Staff ID</label>
            <input
              type="text"
              name="staffId"
              value={staff.staffId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="Enter Staff ID"
            />
          </div>

          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={staff.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="Enter Staff Name"
            />
          </div>

          <div>
            <label className="font-semibold">Department</label>
            <input
              type="text"
              name="department"
              value={staff.department}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="Enter Department"
            />
          </div>
        </div>

        <hr className="my-6" />

        {/* TIMETABLE */}
        <h2 className="text-2xl font-bold mb-3">Staff Timetable</h2>

        <div className="space-y-10">
          {staff.timetable.map((day, dayIndex) => (
            <div
              key={day.dayOrder}
              className="border rounded-xl p-5 bg-gray-50 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">
                Day Order {day.dayOrder}
              </h3>

              {/* Hours Table */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {day.hours.map((hr, hourIndex) => (
                  <div
                    key={hourIndex}
                    className="bg-white border rounded-xl p-4 shadow-sm"
                  >
                    <h4 className="font-semibold text-center mb-2">
                      Hour {hr.hour}
                    </h4>

                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full p-2 border rounded-lg mb-2"
                      value={hr.subject}
                      onChange={(e) =>
                        handleTimetableChange(
                          dayIndex,
                          hourIndex,
                          "subject",
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="text"
                      placeholder="Class"
                      className="w-full p-2 border rounded-lg mb-2"
                      value={hr.className}
                      onChange={(e) =>
                        handleTimetableChange(
                          dayIndex,
                          hourIndex,
                          "className",
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="text"
                      placeholder="Room"
                      className="w-full p-2 border rounded-lg"
                      value={hr.room}
                      onChange={(e) =>
                        handleTimetableChange(
                          dayIndex,
                          hourIndex,
                          "room",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-lg shadow-lg"
        >
          Save Staff Details
        </button>
      </form>
    </div>
  );
};

export default AddStaffForm;
