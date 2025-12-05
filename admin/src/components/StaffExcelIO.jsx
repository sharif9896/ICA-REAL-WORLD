import React, { useState } from "react";
import { BACKEND_URL } from "../../utils/util";

function StaffImport() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(`${BACKEND_URL}api/staffs/import`, {
      method: "POST",
      body: formData,
    });
    alert("Import completed!");
  };

  const handleExport = () => {
    window.location.href = `${BACKEND_URL}api/staffs/exports`;
  };

  return (
    <div>
      <h2>Import Staff Schedule</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleExport}>Export</button>
    </div>
  );
}

export default StaffImport;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API || "http://localhost:1956/api/staffs";

// export default function StaffExcelIO() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");
//   const [rows, setRows] = useState([]);

//   async function load() {
//     const res = await axios.get(API + "/");
//     setRows(res.data);
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   const onImport = async () => {
//     if (!file) return alert("Choose an .xlsx file");
//     setStatus("Importing...");
//     try {
//       const fd = new FormData();
//       fd.append("file", file);
//       await axios.post(API + "/import", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setStatus("Import completed");
//       await load();
//     } catch (e) {
//       setStatus("Import failed: " + (e.response?.data?.message || e.message));
//     }
//   };

//   const onExport = async () => {
//     setStatus("Exporting...");
//     try {
//       const res = await axios.get(API + "/exports", { responseType: "blob" });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "staffs.xlsx";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       setStatus("Export completed");
//     } catch (e) {
//       setStatus("Export failed: " + (e.response?.data?.message || e.message));
//     }
//   };

//   return (
//     <div style={{ padding: 16 }}>
//       <h2>Staff Timetable: Excel Import / Export</h2>
//       <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//         <input
//           type="file"
//           accept=".xlsx,.xls"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//         />
//         <button onClick={onImport}>Import Excel</button>
//         <button onClick={onExport}>Export Excel</button>
//         <a href="/staff_import_template.xlsx" download>
//           Download Template
//         </a>
//       </div>
//       <div style={{ marginTop: 8, opacity: 0.8 }}>{status}</div>

//       <h3 style={{ marginTop: 24 }}>Current Staffs</h3>
//       <div
//         style={{
//           fontSize: 12,
//           overflow: "auto",
//           maxHeight: 400,
//           border: "1px solid #eee",
//         }}
//       >
//         <table cellPadding="6">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Designation</th>
//               <th>Specialization</th>
//               <th>Department</th>
//               <th>College</th>
//               <th>Preview (Day 1)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.name}</td>
//                 <td>{r.designation}</td>
//                 <td>{r.specialization}</td>
//                 <td>{r.department}</td>
//                 <td>{r.college}</td>
//                 <td>
//                   {(r.day_1 || [])
//                     .map(
//                       (h) =>
//                         `${h.hour}:${h.subject}${
//                           h.remark ? `(${h.remark})` : ""
//                         }`
//                     )
//                     .join(" | ")}
//                 </td>
//               </tr>
//             ))}
//             {!rows.length && (
//               <tr>
//                 <td colSpan={6}>No data yet</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
