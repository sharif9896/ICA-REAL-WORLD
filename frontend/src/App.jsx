import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SplashScreen from "./components/SplashScreen";
import AttendanceTable from "./components/AttendanceTable";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 3 seconds
    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <>
      <ToastContainer />
      <Home />
    </>
  );
}

export default App;

// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
// import Profile from "./pages/Profile";

// export default function App() {
//   return (
//     <>
//       <header>
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </header>
//       <Profile />
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SplashScreen from "./components/SplashScreen";
// import AttendanceTable from "./components/AttendanceTable";

// import React from "react";
// import StudentTable from "./pages/StudentTable";

// function App() {
//   return (
//     <div className="container mx-auto">
//       <StudentTable />
//     </div>
//   );
// }

// export default App;

// // import React, { useState } from "react";

// // const App = () => {
// // const [student, setStudent] = useState({
// //   name: "",
// //   registerNumber: "",
// //   department: "",
// //   dob: "",
// //   mobile: "",
// // });

// // const handleChange = (e) => {
// //   setStudent({ ...student, [e.target.name]: e.target.value });
// // };

// // const handleSubmit = (e) => {
// //   e.preventDefault();
// //   alert("Form Submitted Successfully!");
// //   console.log(student);
// // };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 animate-fade-in"
// //       >
// //         <h2 className="text-3xl font-bold text-center text-blue-600 mb-4 animate-bounce">
// //           Student Details Form
// //         </h2>

// //         {/* Grid of input fields */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Full Name */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="text"
// //               name="name"
// //               value={student.name}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Full Name
// //             </label>
// //           </div>

// //           {/* Register Number */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="text"
// //               name="registerNumber"
// //               value={student.registerNumber}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Register Number
// //             </label>
// //           </div>

// //           {/* Department */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="text"
// //               name="department"
// //               value={student.department}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Department
// //             </label>
// //           </div>

// //           {/* Date of Birth */}
// //           <div className="relative z-0 w-full group">
// //             <input
// //               type="date"
// //               name="dob"
// //               value={student.dob}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Date of Birth
// //             </label>
// //           </div>

// //           {/* Mobile Number */}
// //           <div className="relative z-0 w-full group col-span-1 md:col-span-2">
// //             <input
// //               type="tel"
// //               name="mobile"
// //               value={student.mobile}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Mobile Number
// //             </label>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-300 transform hover:scale-105"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useState } from "react";

// // const App = () => {
// //   const [student, setStudent] = useState({
// //     name: "",
// //     registerNumber: "",
// //     department: "",
// //     dob: "",
// //     mobile: "",
// //   });

// //   const handleChange = (e) => {
// //     setStudent({ ...student, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     alert("Form Submitted Successfully!");
// //     console.log(student);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6 animate-fade-in"
// //       >
// //         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 animate-bounce">
// //           Student Details Form
// //         </h2>

// //         {/* Input Field Template */}
// //         {[
// //           { label: "Full Name", name: "name", type: "text" },
// //           { label: "Register Number", name: "registerNumber", type: "text" },
// //           { label: "Department", name: "department", type: "text" },
// //           { label: "Date of Birth", name: "dob", type: "date" },
// //           { label: "Mobile Number", name: "mobile", type: "tel" },
// //         ].map((field, index) => (
// //           <div className="relative z-0 w-full group" key={index}>
// //             <input
// //               type={field.type}
// //               name={field.name}
// //               value={student[field.name]}
// //               onChange={handleChange}
// //               required
// //               className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
// //               placeholder=" "
// //             />
// //             <label
// //               htmlFor={field.name}
// //               className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
// //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               {field.label}
// //             </label>
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-300 transform hover:scale-105"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default App;
