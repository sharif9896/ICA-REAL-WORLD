import React, { useState } from "react";

const StudentContainer = () => {
  const [student, setStudent] = useState({
    name: "",
    registerNumber: "",
    department: "",
    Class: "",
    email: "",
    address: "",
    pname: "",
    dob: "",
    pno: "",
    adno: "",
    mobile: "",
    bgp: "",
    batch: "",
    bno: "",
    bname: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully!");
    console.log(student);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 animate-fade-in"
        >
          <h2 className="text-xm sm:text-3xl font-bold text-center text-blue-600 mb-4 animate-bounce">
            Student Details Form
          </h2>

          {/* Grid of input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Register Number */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="registerNumber"
                value={student.registerNumber}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Register Number
              </label>
            </div>
            {/* Full Name */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>
            {/* Email */}
            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            {/* Date of Birth */}
            <div className="relative z-0 w-full group">
              <input
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date of Birth
              </label>
            </div>

            {/* Class */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="Class"
                value={student.Class}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Class
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
            {/* Address */}
            <div className="relative z-0 w-full group">
              <textarea
                type="text"
                name="address"
                value={student.address}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address
              </label>
            </div>

            {/* Mobile Number */}
            <div className="relative z-0 w-full group">
              <input
                type="tel"
                name="mobile"
                value={student.mobile}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile Number
              </label>
            </div>
            {/* Parent Name */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="pname"
                value={student.pname}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Parent Name
              </label>
            </div>
            {/* Parent Number */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="pno"
                value={student.pno}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Parent Number
              </label>
            </div>
            {/* Adhar Number */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="adno"
                value={student.adno}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adhar Number
              </label>
            </div>
            {/* Bllod Group */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="bgp"
                value={student.bgp}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Blood Group
              </label>
            </div>

            {/* Batch */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="batch"
                value={student.batch}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Batch
              </label>
            </div>

            {/* Bank Account No */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="bno"
                value={student.bno}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Bank Account No
              </label>
            </div>

            {/* Bank Name */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="bname"
                value={student.bname}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
                placeholder=" "
              />
              <label
                className="absolute left-0 text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Bank Name
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

export default StudentContainer;
