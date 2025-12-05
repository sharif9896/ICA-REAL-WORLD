import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import images from "../assets";

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link className="" to={`/Navigate_class/${department}`}>
        <center className="dd relative">
          <video
            loop
            autoPlay
            className="w-60 h-40 relative hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <source src={images.img1} type="video/mp4" />
          </video>
          <p className="cc absolute top-0 right-0 text-gray-100 hover:bg-amber-900 cursor-pointer bg-amber-600 rounded px-1 ">
            {" "}
            Open →
          </p>
        </center>
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {department}
        </h2>
        <div className="flex justify-end space-x-3">
          {/* <button
            onClick={() => onEdit(department)}
            className="flex cursor-pointer items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FiEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(department)}
            className="flex cursor-pointer items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FiTrash2 /> Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
