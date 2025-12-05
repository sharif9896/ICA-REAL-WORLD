import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/util";

const StudentCards = ({ classlists }) => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [subject, setSubject] = useState("");

  const today = new Date();
  const date = today.toLocaleDateString("en-IN");
  const day = today.toLocaleDateString("en-IN", { weekday: "long" });

  const handleStatus = (regNo, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [regNo]: { ...prev[regNo], Status: status },
    }));
  };

  const handleSubmit = async () => {
    if (!subject) return toast.error("Please enter subject");

    const records = classlists.map((student) => ({
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
      await axios.post(`${BACKEND_URL}api/attendance/attendance`, records);
      toast.success("Attendance submitted!");
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 ">
      <div className="max-w-fit sm:max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📋 Student Attendance
        </h2>

        <div className="mb-6 flex items-center gap-4 text-gray-800">
          <input
            type="text"
            placeholder="Enter Subject"
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
                <th hidden className="p-3 text-left text-sm font-semibold">
                  Class
                </th>
                <th hidden className="p-3 text-left text-sm font-semibold">
                  Department
                </th>
                <th className="p-3 text-center text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {classlists.map((student) => (
                <tr key={student.Reg_no} className="hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={student.image}
                      alt={student.Name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="p-3 text-[15px] sm:text-sm">
                    {student.Reg_no}
                  </td>
                  <td className="p-3 text-[15px] sm:text-sm">{student.Name}</td>
                  <td hidden className="p-3 text-[15px] sm:text-sm">
                    {student.Class}
                  </td>
                  <td hidden className="p-3 text-[15px] sm:text-sm">
                    {student.Department}
                  </td>
                  <td className="p-3 text-[15px] sm:text-center flex space-x-2">
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

export default StudentCards;

// import React, { useEffect, useState, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// // import EditStudentModal from "./EditStudentModal";
// import axios from "axios";
// import toast from "react-hot-toast";
// import EditStudentModal from "../components/EditStudentModal";
// import images from "../assets";

// export default function StudentCards({ classlists }) {
//   const [students, setStudents] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const dt = useRef(null);

// const fetchStudents = () => {
//   axios.get("http://localhost:1956/students").then((res) => {
//     setStudents(res.data);
//   });
// };

// useEffect(() => {
//   fetchStudents();
// }, []);

//   const exportCSV = () => {
//     dt.current.exportCSV();
//   };

//   const deleteStudent = (id) => {
//     axios.delete(`http://localhost:1956students/${id}`).then(() => {
//       toast.success("Student deleted");
//       fetchStudents();
//     });
//   };

//   const actionBody = (rowData) => (
//     <div className="space-x-2">
//       <Button
//         icon="pi pi-pencil"
//         className="p-button-sm p-button-rounded p-button-warning"
//         onClick={() => {
//           setSelectedStudent(rowData);
//           setModalOpen(true);
//         }}
//       />
//       <Button
//         icon="pi pi-trash"
//         className="p-button-sm p-button-rounded p-button-danger"
//         onClick={() => deleteStudent(rowData._id)}
//       />
//     </div>
//   );

//   const imageBodyTemplate = (rowData) => {
//     return rowData.image ? (
//       <img
//         src={rowData.image}
//         alt="student"
//         className="w-20 h-15 object-cover border border-gray-300"
//       />
//     ) : (
//       <span className="text-gray-400">
//         <img src={images.img3} alt="" />
//       </span>
//     );
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4 text-gray-900">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Student Records
//           </h2>
//           <Button
//             label="Export CSV"
//             icon="pi pi-download"
//             onClick={exportCSV}
//           />
//         </div>

//         <div className="mb-3">
//           <span className="p-input-icon-left">
//             <i className="px-2 pi pi-search" />
//             <InputText
//               value={globalFilter}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               placeholder="     Search by name or register no"
//             />
//           </span>
//         </div>

//         <DataTable
//           ref={dt}
//           value={classlists}
//           paginator
//           rows={5}
//           dataKey="_id"
//           globalFilter={globalFilter}
//           rowsPerPageOptions={[5, 10, 20]}
//           responsiveLayout="scroll"
//           stripedRows
//           showGridlines
//           emptyMessage="No student records found"
//         >
//           <Column field="image" header="Photo" body={imageBodyTemplate} />
//           <Column field="Reg_no" header="Register No" sortable />
//           <Column field="Name" header="Name" sortable />
//           <Column field="Class" header="Class" sortable />
//           <Column field="Department" header="Department" sortable />
//           <Column field="BloodGroup" header="Blood Group" sortable />
//           <Column field="Phone" header="Mobile No" sortable />
//           <Column field="ParentPhone" header="Parent No" sortable />
//           <Column field="Adhar" header="Aadhar No" sortable />
//           <Column field="BankName" header="Bank Name" sortable />
//           <Column field="BankAccount" header="Account No" sortable />
//           <Column field="Email" header="Email" sortable />
//           <Column field="ParentName" header="Parent Name" sortable />
//           <Column field="Address" header="Address" sortable />
//           <Column header="Actions" body={actionBody} />
//         </DataTable>

//         <EditStudentModal
//           visible={modalOpen}
//           student={selectedStudent}
//           onHide={() => setModalOpen(false)}
//           onUpdated={fetchStudents}
//         />
//       </div>
//     </div>
//   );
// }
