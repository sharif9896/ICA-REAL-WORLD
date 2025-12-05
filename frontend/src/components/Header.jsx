import { Link } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";

const HeaderContainer = styled.div`
  width: 100%;
  background: #f0f0f0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
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
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdClass } from "react-icons/md";
import Profile from "../pages/Profile";
import NeonFlickerText from "./NeonFlickerText";

const SidebarContainer = styled(motion.div)`
  width: 100%;
  background: #fff;
  min-height: 100vh;
  padding: 10px;
  position: fixed;
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  text-decoration: none;
  color: #303030;
  font-size: 18px;
  transition: 0.3s;

  &:hover {
    background: #3498db;
    border-radius: 5px;
  }
`;

const Header = () => {
  const [visible, setvisible] = useState();
  // const [trues, setTrues] = useState(false);
  return (
    <>
      <HeaderContainer>
        <Link to={"/dashboard"} className=" cursor-pointer">
          <NeonFlickerText text="ICA" />
        </Link>
        <Link to={"/dashboard"} className=" cursor-pointer">
          <h1 className="text-2xl bold text-gray-900 ">Staff Panel</h1>
        </Link>
        <div
          className="text-3xl text-gray-400 cursor-pointer"
          onClick={() => setvisible(true)}
        >
          <CgMenuLeft />
        </div>
      </HeaderContainer>
      <div
        className={` z-2 absolute top-0 bottom-0 right-0 w-[100%] transition-transform ease-out duration:3000 text-xl font-medium bg-[#eee7e7] ${
          visible ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-cols flex-row py-3 px-3 ">
          <div
            onClick={() => setvisible(false)}
            className="flex item-center gap-5  text-gray-800 cursor-pointer"
          >
            <FaAngleLeft className="mt-1" />

            <div className="flex item-center text-gray-800">Back</div>
          </div>
        </div>

        {/* <hr className="border-gray-300 w-[100%]" /> */}

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
      <hr className="border-gray-300" />
    </>
  );
};

export default Header;
