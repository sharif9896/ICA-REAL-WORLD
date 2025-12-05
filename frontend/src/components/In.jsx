import React, { useEffect, useState } from "react";
import DepartmentCard from "./DepartmentCard";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";
import toast from "react-hot-toast";

const In = () => {
  const initialDepartments = [
    { id: 1, name: "Computer Science", imageUrl: "" },
    { id: 2, name: "Mechanical", imageUrl: "" },
    { id: 3, name: "Electrical", imageUrl: "" },
  ];

  const [departments, setDepartments] = useState([]);
  const [editDept, setEditDept] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fetchdepartment = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}api/admin/departments/departmentslist`
      );
      setDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdepartment();
  }, []);
  const handleEdit = (dept) => setEditDept(dept);
  const handleDelete = (dept) => setConfirmDelete(dept);

  const saveEdit = () => {
    setDepartments((prev) =>
      prev.map((d) => (d._id === editDept._id ? editDept : d))
    );
    setEditDept(null);
  };

  const confirmDeleteAction = () => {
    setDepartments((prev) => prev.filter((d) => d.id !== confirmDelete.id));
    setConfirmDelete(null);
  };
  // departments.map((val) => {
  //   console.log(val.department);
  // });
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-6">
        <div className="card  flex justify-between items-center gap-2 text-amber-50 bg-[#074d92] py-5 px-3 w-auto rounded">
          <h4>Total Absentees</h4>
          <p>10</p>
        </div>
        <div
          className="card text-[15px] flex justify-between items-center gap-2 text-amber-50 bg-[#07920e] py-3 px-2 sm:py-5 sm:px-3 w-fit-content
         rounded"
        >
          <h4>Total Presentees</h4>
          <p>10</p>
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6" hidden>
          College Departments
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept._id}
              department={dept.department}
              onEdit={() => handleEdit(dept.department)}
              onDelete={() => handleDelete(dept.department)}
            />
          ))}
        </div>

        {/* Edit Modal */}
        {editDept && (
          <div className="fixed inset-0 flex items-center justify-center text-gray-900 bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Department</h2>
              <input
                type="text"
                value={editDept}
                onChange={(e) =>
                  setEditDept({ ...editDept, name: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditDept(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center text-gray-900 bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p>
                Are you sure you want to delete <strong>{confirmDelete}</strong>
                ?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAction}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default In;
