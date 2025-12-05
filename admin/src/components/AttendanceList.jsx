// import { useEffect, useRef, useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { Toast } from "primereact/toast";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils/util";

// const AttendanceList = ({ classlists }) => {
//   const [records, setRecords] = useState([]);
//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: "contains" },
//   });
//   const [globalFilterValue, setGlobalFilterValue] = useState("");
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [editVisible, setEditVisible] = useState(false);
//   const toast = useRef(null);
//   const dt = useRef(null);

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = () => {
//     axios.get("/api/attendance").then((res) => setRecords(res.data));
//   };

//   const exportCSV = () => {
//     dt.current.exportCSV();
//   };

//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     setGlobalFilterValue(value);
//     setFilters({
//       global: { value, matchMode: "contains" },
//     });
//   };

//   const imageTemplate = (row) => (
//     <img
//       src={row.Photo}
//       alt="student"
//       className="w-10 h-10 rounded-full object-cover border"
//     />
//   );

//   const onEditClick = (rowData) => {
//     setEditingRecord({ ...rowData });
//     setEditVisible(true);
//   };

//   const onEditSave = async () => {
//     try {
//       await axios.put(
//         `${BACKEND_URL}api/attendance/updateattendance/${classlists.map(
//           (item) => item._id
//         )}`,
//         editingRecord
//       );
//       setEditVisible(false);
//       toast.current.show({
//         severity: "success",
//         summary: "Updated",
//         detail: "Record updated successfully",
//       });
//       fetchRecords();
//     } catch (err) {
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Update failed",
//       });
//     }
//   };

//   const header = (
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//       <h2 className="text-xl font-bold text-gray-800">📊 Attendance List</h2>
//       <div className="flex gap-2 items-center">
//         <span className="p-input-icon-left">
//           <i className="pi pi-search" />
//           <InputText
//             value={globalFilterValue}
//             onChange={onGlobalFilterChange}
//             placeholder="Search by Reg No / Name"
//           />
//         </span>
//         <Button
//           type="button"
//           icon="pi pi-download"
//           label="Export CSV"
//           onClick={exportCSV}
//           severity="success"
//         />
//       </div>
//     </div>
//   );

//   const actionTemplate = (rowData) => (
//     <Button
//       icon="pi pi-pencil"
//       className="p-button-rounded p-button-text"
//       onClick={() => onEditClick(rowData)}
//     />
//   );

//   return (
//     <div className="p-4 md:p-8">
//       <Toast ref={toast} />
//       <div className="bg-white shadow-md rounded-xl p-4">
//         <DataTable
//           ref={dt}
//           value={classlists}
//           paginator
//           rows={10}
//           rowsPerPageOptions={[10, 20, 50]}
//           header={header}
//           filters={filters}
//           globalFilterFields={["Reg_no", "Name"]}
//           emptyMessage="No attendance records found"
//           responsiveLayout="scroll"
//           showGridlines
//           stripedRows
//         >
//           <Column
//             header="Photo"
//             body={imageTemplate}
//             style={{ width: "80px" }}
//           />
//           <Column field="Reg_no" header="Register No" sortable />
//           <Column field="Name" header="Name" sortable />
//           <Column field="Class" header="Class" />
//           <Column field="Department" header="Department" />
//           <Column field="Subject" header="Subject" />
//           <Column field="Status" header="Status" />
//           <Column field="Date" header="Date" />
//           <Column field="Day" header="Day" />
//           <Column
//             body={actionTemplate}
//             header="Actions"
//             style={{ width: "80px" }}
//           />
//         </DataTable>

//         <Dialog
//           header="Edit Record"
//           visible={editVisible}
//           onHide={() => setEditVisible(false)}
//           style={{ width: "500px" }}
//         >
//           {editingRecord && (
//             <div className="flex flex-col gap-3">
//               <InputText
//                 value={editingRecord.Subject}
//                 onChange={(e) =>
//                   setEditingRecord({
//                     ...editingRecord,
//                     Subject: e.target.value,
//                   })
//                 }
//                 placeholder="Subject"
//               />
//               <InputText
//                 value={editingRecord.Status}
//                 onChange={(e) =>
//                   setEditingRecord({ ...editingRecord, Status: e.target.value })
//                 }
//                 placeholder="Status"
//               />
//               <Button label="Save" icon="pi pi-check" onClick={onEditSave} />
//             </div>
//           )}
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default AttendanceList;

import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Calendar } from "primereact/calendar";

const AttendanceList = ({ classlists }) => {
  //   console.log(classlists);
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allRecords, setAllRecords] = useState([]); // for filtering base

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const dt = useRef(null);

  useEffect(() => {
    axios.get("/api/attendance").then((res) => {
      setAllRecords(res.data);
      setRecords(res.data);
    });
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({
      global: { value, matchMode: "contains" },
    });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableData = records.map((r) => [
      r.Reg_no,
      r.Name,
      r.Class,
      r.Department,
      r.Subject,
      r.Status,
      r.Date,
      r.Day,
    ]);

    autoTable(doc, {
      head: [
        [
          "Reg No",
          "Name",
          "Class",
          "Department",
          "Subject",
          "Status",
          "Date",
          "Day",
        ],
      ],
      body: tableData,
    });

    doc.save("attendance.pdf");
  };

  const handlePrint = () => {
    const printContents = document.getElementById("attendance-table").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
          <html>
            <head>
              <title>Attendance Print</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `);
    printWindow.document.close();
    printWindow.print();
  };

  const header = (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h2 className="text-xl font-bold text-gray-800">📊 Attendance List</h2>
      <div className="flex gap-2 items-center">
        <Calendar
          value={selectedDate}
          onChange={(e) => {
            const value = e.value;
            setSelectedDate(value);
            const formatted = value?.toLocaleDateString("en-IN");
            const filtered = allRecords.filter((r) => r.Date === formatted);
            setRecords(filtered);
          }}
          placeholder="Filter by date"
          showIcon
        />

        <span className="p-input-icon-left">
          <i className="pi pi-search ml-1" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="   Search by Reg No / Name"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-download"
          label="Export CSV"
          onClick={exportCSV}
          severity="success"
        />

        <Button
          icon="pi pi-print"
          label="Print"
          className="p-button-help"
          onClick={handlePrint}
        />
      </div>
    </div>
  );

  //   const imageTemplate = (row) => (
  //     <img
  //       src={row.Photo}
  //       alt="student"
  //       className="w-10 h-10 rounded-full object-cover border"
  //     />
  //   );

  return (
    <>
      <div className="p-4 md:p-8">
        <div className="bg-white shadow-md rounded-xl p-4">
          <DataTable
            ref={dt}
            id="attendance-table"
            value={classlists}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            header={header}
            filters={filters}
            globalFilterFields={["Reg_no", "Name"]}
            emptyMessage="No attendance records found"
            responsiveLayout="scroll"
            showGridlines
            stripedRows
          >
            {/* <Column
            header="Photo"
            body={imageTemplate}
            style={{ width: "80px" }}
          /> */}
            <Column field="Reg_no" header="Register No" sortable />
            <Column field="Name" header="Name" sortable />
            <Column field="Class" header="Class" />
            <Column field="Department" header="Department" />
            <Column field="Subject" header="Subject" />
            <Column field="Status" header="Status" />
            <Column field="Date" header="Date" />
            <Column field="Day" header="Day" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default AttendanceList;
