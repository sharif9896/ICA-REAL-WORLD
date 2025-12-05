import { NavLink } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaAddressBook,
  FaUserPlus,
} from "react-icons/fa";
import styled from "styled-components";
import { IoIosPaper } from "react-icons/io";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdClass } from "react-icons/md";
import { BACKEND_URL } from "../../utils/util";

const SidebarContainer = styled(motion.div)`
  width: 250px;
  background: #131212ff;
  // background: rgb(235, 231, 231);
  border-right: 1px solid #ddd;
  min-height: 100vh;
  padding: 20px;
  position: fixed;
  z-index: 999;
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  text-decoration: none;
  color: #ffffffff;
  font-size: 15px;
  transition: 0.3s;

  &:hover {
    background: #3498db;
    border-radius: 5px;
  }
`;

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  const handlelogout = async (req, res) => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/admin/logout`);
      toast.success(response.data.message);
      localStorage.removeItem("admin");
      window.location.href = "/";
      // setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={`hidden sm:block`}>
      <SidebarContainer
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <SidebarItem to="/dashboard">
          <FaHome /> &nbsp; Home
        </SidebarItem>
        <SidebarItem to="/AttendanceEdit">
          <IoIosPaper /> &nbsp; Attendance
        </SidebarItem>
        <SidebarItem to="/Time-table">
          <IoIosPaper /> &nbsp; Time Table
        </SidebarItem>
        <SidebarItem to="/AttendanceSummary">
          <IoIosPaper /> &nbsp; Attendance Summary
        </SidebarItem>
        <SidebarItem to="/attendancereport">
          <IoIosPaper /> &nbsp; Report
        </SidebarItem>
        <SidebarItem to="/settings">
          <FaCog /> &nbsp; Settings
        </SidebarItem>
        <SidebarItem to="/Logout" onClick={() => handlelogout()}>
          <FaSignOutAlt /> &nbsp; Logout
        </SidebarItem>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
