import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodItems from "../components/FoodItems";
import In from "../components/In";
import Attin from "../components/Attin";

const DashboardContainer = styled.div`
  // text-align: center;

  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f0f0;
  color: white;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem("staff"))?.token;
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header />
        <DashboardContainer className="sm:ml-[250px]">
          <Attin />
        </DashboardContainer>
        <Footer />
      </MainContent>
    </Container>
  );
};

export default Dashboard;

// import React from "react";
// import { Link } from "react-router-dom";
// import {toast} from "react-toastify";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
// import { BACKEND_URL } from "../../utils/util";

// function Dashboard() {
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}api/admin/logout`);
//       toast.success(response.data.message);
//       localStorage.removeItem("admin");
//       navigate("/")
//     } catch (error) {
//       console.log("Error in logging out ", error);
//       toast.error(error.response.data.errors || "Error in logging out");
//     }
//   };
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-100 p-5">
//         <div className="flex items-center flex-col mb-10">
//           <img src="public/log.png" alt="Profile" className="rounded-full h-20 w-20" />
//           <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
//         </div>
//         <nav className="flex flex-col space-y-4">
//           <Link to="/admin/our-courses">
//             <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
//               Our Courses
//             </button>
//           </Link>
//           <Link to="/admin/create-course">
//             <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
//               Create Course
//             </button>
//           </Link>

//           <Link to="/">
//             <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
//               Home
//             </button>
//           </Link>
//           {/* <Link to="/admin/login"> */}
//             <button
//               onClick={handleLogout}
//               className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
//             >
//               Logout
//             </button>
//           {/* </Link> */}
//         </nav>
//       </div>
//       <div className="flex h-screen items-center justify-center ml-[40%]">
//         Welcome!!!
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils/util";
// import toast from "react-hot-toast";
// import DepartmentCard from "../components/DepartmentCard";

// const AttendanceEdit = () => {
//   const initialDepartments = [
//     { id: 1, name: "Computer Science", imageUrl: "" },
//     { id: 2, name: "Mechanical", imageUrl: "" },
//     { id: 3, name: "Electrical", imageUrl: "" },
//   ];

//   const [departments, setDepartments] = useState([]);
//   const [editDept, setEditDept] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const fetchdepartment = async () => {
//     try {
//       const response = await axios.get(
//         `${BACKEND_URL}api/admin/departments/departmentslist`
//       );
//       setDepartments(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchdepartment();
//   }, []);
//   const handleEdit = (dept) => setEditDept(dept);
//   const handleDelete = (dept) => setConfirmDelete(dept);

//   const saveEdit = () => {
//     setDepartments((prev) =>
//       prev.map((d) => (d._id === editDept._id ? editDept : d))
//     );
//     setEditDept(null);
//   };

//   const confirmDeleteAction = () => {
//     setDepartments((prev) => prev.filter((d) => d.id !== confirmDelete.id));
//     setConfirmDelete(null);
//   };
//   // departments.map((val) => {
//   //   console.log(val.department);
//   // });
//   return (
//     <>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-6">
//         {/* <div className="card  flex justify-between items-center gap-2 text-amber-50 bg-[#074d92] py-5 px-3 w-auto rounded">
//           <h4>Total Absentees</h4>
//           <p>10</p>
//         </div>
//         <div
//           className="card text-[15px] flex justify-between items-center gap-2 text-amber-50 bg-[#07920e] py-3 px-2 sm:py-5 sm:px-3 w-fit-content
//          rounded"
//         >
//           <h4>Total Presentees</h4>
//           <p>10</p>
//         </div> */}
//       </div>
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h1 className="text-3xl font-bold mb-6" hidden>
//           College Departments
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//           {departments.map((dept) => (
//             <DepartmentCard
//               key={dept._id}
//               department={dept.department}
//               onEdit={() => handleEdit(dept.department)}
//               onDelete={() => handleDelete(dept.department)}
//             />
//           ))}
//         </div>

//         {/* Edit Modal */}
//         {editDept && (
//           <div className="fixed inset-0 flex items-center justify-center text-gray-900 bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
//               <h2 className="text-xl font-semibold mb-4">Edit Department</h2>
//               <input
//                 type="text"
//                 value={editDept}
//                 onChange={(e) =>
//                   setEditDept({ ...editDept, name: e.target.value })
//                 }
//                 className="w-full border border-gray-300 p-2 rounded mb-4"
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   onClick={() => setEditDept(null)}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={saveEdit}
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation */}
//         {confirmDelete && (
//           <div className="fixed inset-0 flex items-center justify-center text-gray-900 bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
//               <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
//               <p>
//                 Are you sure you want to delete <strong>{confirmDelete}</strong>
//                 ?
//               </p>
//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   onClick={() => setConfirmDelete(null)}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDeleteAction}
//                   className="px-4 py-2 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AttendanceEdit;
