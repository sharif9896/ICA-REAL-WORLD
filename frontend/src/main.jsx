import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Signin from "./pages/Signin.jsx";
import { Provider } from "react-redux";
import ecommerce from "../store/index.js";
import { Toaster } from "react-hot-toast";
import Studentcon from "./pages/Studentcon.jsx";
import StudentsEntry from "./pages/StudentsEntry.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core
import "primeicons/primeicons.css"; // Icons
import ClassEntry from "./pages/ClassEntry.jsx";
import DepartmentCon from "./pages/DepartmentCon.jsx";
import Navigate_class from "./pages/Navigate_class.jsx";
import Navigate_first_Students from "./pages/Navigate_first_Students.jsx";
import Navigate_second_student from "./pages/Navigate_second_student.jsx";
import Navigate_third_student from "./pages/Navigate_third_student.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import AttendanceEdit from "./pages/AttendanceEdit.jsx";
import StaffTables from "./pages/StaffTables.jsx";
import AttendanceStats from "./pages/AttendanceStats.jsx";
import AttendanceSummary from "./pages/AttendanceSummary.jsx";
import Attendancedashboard from "./pages/Attendancedashboard.jsx";
import AttendanceReports from "./pages/AttendanceReports.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AdminLogin /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/signin", element: <Signin /> },
      { path: "/addstudent", element: <Studentcon /> },
      { path: "/addstudent/StudentsEntry", element: <StudentsEntry /> },
      { path: "/addstudent/ClassesEntry", element: <ClassEntry /> },
      { path: "/dashboard/DepartmentEntry", element: <DepartmentCon /> },
      { path: "/Navigate_class/:department", element: <Navigate_class /> },
      {
        path: "/Navigate_first_Students/:first/:department",
        element: <Navigate_first_Students />,
      },
      {
        path: "/Navigate_second_student/:second/:department",
        element: <Navigate_second_student />,
      },
      {
        path: "/Navigate_third_student/:third/:department",
        element: <Navigate_third_student />,
      },
      { path: "/AttendanceEdit", element: <AttendanceEdit /> },
      { path: "/Time-table", element: <StaffTables /> },
      { path: "/atten", element: <AttendanceStats /> },
      { path: "/AttendanceSummary", element: <Attendancedashboard /> },
      { path: "/attendancereport", element: <AttendanceReports /> },
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={ecommerce}>
        <RouterProvider router={route}></RouterProvider>
        <Toaster position="top-center" />
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
