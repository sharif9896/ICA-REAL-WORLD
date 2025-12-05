import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../utils/util";
import toast from "react-hot-toast";

const AddClasses = () => {
  const [student, setStudent] = useState({
    firstyear: "",
    secondyear: "",
    thirdyear: "",
    department: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/admin/classes/addClass`,
        student
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 animate-fade-in"
        >
          <h2 className="text-xm sm:text-3xl font-bold text-center text-blue-600 mb-4 animate-bounce">
            Class Details Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="firstyear"
                value={student.firstyear}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Class 1
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="secondyear"
                value={student.secondyear}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Class 2
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="thirdyear"
                value={student.thirdyear}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Class 3
              </label>
            </div>

            {/* Department */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="department"
                value={student.department}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Department
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddClasses;
