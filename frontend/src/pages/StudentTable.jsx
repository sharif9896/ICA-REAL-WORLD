import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import EditStudentModal from "./EditStudentModal";
import axios from "axios";
import toast from "react-hot-toast";
import EditStudentModal from "../components/EditStudentModal";
import images from "../assets";
import { BACKEND_URL } from "../../utils/util";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dt = useRef(null);

  const fetchStudents = () => {
    axios.get(`${BACKEND_URL}students`).then((res) => {
      setStudents(res.data);
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const deleteStudent = (id) => {
    axios.delete(`${BACKEND_URL}students/${id}`).then(() => {
      toast.success("Student deleted");
      fetchStudents();
    });
  };

  const imageBodyTemplate = (rowData) => {
    return rowData.image ? (
      <img
        src={rowData.image}
        alt="student"
        className="w-25 h-15  object-cover border border-gray-300"
      />
    ) : (
      <span className="text-gray-400">
        <img src={images.img3} alt="" />
      </span>
    );
  };

  const actionBody = (rowData) => (
    <div className="space-x-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-sm p-button-rounded p-button-warning"
        onClick={() => {
          setSelectedStudent(rowData);
          setModalOpen(true);
        }}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-sm p-button-rounded p-button-danger"
        onClick={() => deleteStudent(rowData._id)}
      />
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Student Records</h2>
          <Button
            label="Export CSV"
            icon="pi pi-download"
            onClick={exportCSV}
          />
        </div>

        <div className="mb-3">
          <span className="p-input-icon-left">
            <i className="px-2 pi pi-search" />
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="     Search by name or register no"
            />
          </span>
        </div>

        <DataTable
          ref={dt}
          value={students}
          paginator
          rows={5}
          dataKey="_id"
          globalFilter={globalFilter}
          rowsPerPageOptions={[5, 10, 20]}
          responsiveLayout="scroll"
          stripedRows
          showGridlines
          emptyMessage="No student records found"
        >
          <Column field="image" header="Photo" body={imageBodyTemplate} />
          <Column field="Reg_no" header="Register No" sortable />
          <Column field="Name" header="Name" sortable />
          <Column field="Class" header="Class" sortable />
          <Column field="Department" header="Department" sortable />
          <Column field="BloodGroup" header="Blood Group" sortable />
          <Column field="Phone" header="Mobile No" sortable />
          <Column field="ParentPhone" header="Parent No" sortable />
          <Column field="Adhar" header="Aadhar No" sortable />
          <Column field="BankName" header="Bank Name" sortable />
          <Column field="BankAccount" header="Account No" sortable />
          <Column field="Email" header="Email" sortable />
          <Column field="ParentName" header="Parent Name" sortable />
          <Column field="Address" header="Address" sortable />
          <Column header="Actions" body={actionBody} />
        </DataTable>

        <EditStudentModal
          visible={modalOpen}
          student={selectedStudent}
          onHide={() => setModalOpen(false)}
          onUpdated={fetchStudents}
        />
      </div>
    </div>
  );
}
