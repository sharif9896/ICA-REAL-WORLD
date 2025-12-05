import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import StudentTable from "./StudentTable";
import MatchImageButton from "../components/MatchImageButton";
import { BACKEND_URL } from "../../utils/util";

function AddStudent() {
  const [file, setFile] = useState(null);

  // File type validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file. Please upload an Excel (.xlsx or .xls) file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file to upload.");
      return;
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    try {
      const res = await axios.post(`${BACKEND_URL}students`, {
        students: jsonData,
      });
      toast.success(res.data.message || "Students inserted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}export`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Students.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Excel file downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Download failed. Check backend /export route.");
    }
  };
  const handleClearAll = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete all student data?"
      );
      if (!confirm) return;

      await axios.delete(`${BACKEND_URL}clear`);
      toast.success("All student data cleared from MongoDB!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear data!");
    }
  };

  return (
    <>
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>Student Excel Import/Export</h2>

        <div className="flex  items-center my-2 justify-center gap-2">
          <input
            className="border w-[45%] py-1 px-1 rounded cursor-pointer focus:outline-blue-500"
            type="file"
            onChange={handleFileChange}
          />
          <div>
            <button
              className=" py-1 px-1 bg-green-500 hover:bg-green-600 text-white shadow-2xl rounded cursor-pointer"
              onClick={handleUpload}
              style={{ marginRight: "10px" }}
            >
              Upload Excel
            </button>
            <MatchImageButton />
            <button
              className="py-1 px-1 bg-gray-500 hover:bg-gray-600 text-white shadow-2xl rounded cursor-pointer"
              onClick={handleDownload}
              style={{ marginRight: "10px" }}
            >
              Download Excel
            </button>
            <button
              onClick={handleClearAll}
              className="py-1 px-1 bg-red-500 hover:bg-red-600 text-white shadow-2xl rounded cursor-pointer"
            >
              Clear All Data
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center text-gray-700 gap-2 flex-wrap mb-2">
          <hr className="border-none w-20 sm:w-36 h-[1px] bg-gray-500 " />
          or <hr className="border-none w-20 sm:w-36 h-[1px] bg-gray-500 " />
        </div>
        <center>
          <Link
            to="StudentsEntry"
            className="py-1 px-1 cursor-pointer w-fit bg-amber-900 hover:bg-amber-950 text-white rounded"
          >
            Click to Add Individually
          </Link>
        </center>
        <Toaster position="top-center" />
      </div>

      <StudentTable />
    </>
  );
}

export default AddStudent;

// import React from 'react'

// const AddStudent = () => {
//   return (
//     <>

//     </>
//   )
// }

// export default AddStudent;
