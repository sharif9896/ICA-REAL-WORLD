import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import images from "../assets";
import { Link } from "react-router-dom";

const Class_AT = ({ classlists }) => {
  const [dept, setdept] = useState("");
  const [firstyear, setfirstyear] = useState("");
  const [secondyear, setsecondyear] = useState("");
  const [thirdyear, setthirdyear] = useState("");
  useEffect(() => {
    classlists.map((val) => {
      setdept(val.department);
      setfirstyear(val.firstyear);
      setsecondyear(val.secondyear);
      setthirdyear(val.thirdyear);
    });
  });
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl text-center items-center text-gray-900 font-bold mb-6">
        {classlists.map((item) => item.department)}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <Link
            className=""
            to={`/Navigate_first_Students_AT/${firstyear}/${dept}`}
          >
            <center className="dd relative">
              <video
                loop
                autoPlay
                className="w-70 h-50 relative hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <source src={images.img2} type="video/mp4" />
              </video>
              <p className="cc absolute top-0 right-0 text-gray-100 hover:bg-amber-900 cursor-pointer bg-amber-600 rounded px-1 ">
                {" "}
                Open →
              </p>
            </center>
          </Link>

          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              <b>First year : </b>
              {classlists.map((item) => item.firstyear)}
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
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <Link
            className=""
            to={`/Navigate_second_student_AT/${secondyear}/${dept}`}
          >
            <center className="dd relative">
              <video
                loop
                autoPlay
                className="w-70 h-50 relative hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <source src={images.img2} type="video/mp4" />
              </video>
              <p className="cc absolute top-0 right-0 text-gray-100 hover:bg-amber-900 cursor-pointer bg-amber-600 rounded px-1 ">
                {" "}
                Open →
              </p>
            </center>
          </Link>

          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              <b>Second year : </b>
              {classlists.map((item) => item.secondyear)}
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
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <Link
            className=""
            to={`/Navigate_third_student_AT/${thirdyear}/${dept}`}
          >
            <center className="dd relative">
              <video
                loop
                autoPlay
                className="w-70 h-50 relative hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <source src={images.img2} type="video/mp4" />
              </video>
              <p className="cc absolute top-0 right-0 text-gray-100 hover:bg-amber-900 cursor-pointer bg-amber-600 rounded px-1 ">
                {" "}
                Open →
              </p>
            </center>
          </Link>

          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              <b>Third year : </b>
              {classlists.map((item) => item.thirdyear)}
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
      </div>
    </div>
  );
};

export default Class_AT;
