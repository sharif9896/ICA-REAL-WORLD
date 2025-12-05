import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils/util";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ password });
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/admin/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AdminLogin successful: ", response.data);
      toast.success(response.data.message);
      navigate("/dashboard");
      // navigate("/admin/login");
      localStorage.setItem("admin", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
      }
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
      {/* <video
        src="mm.mp4"
        autoPlay
        muted
        loop
        id="myVideo"
        className="relative w-[100%] h-[100%] object-cover"
      >
      </video> */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center absolute top-5  left-0 right-0 bottom-0"
        // style={{ backgroundVideo: "url('mm.mp4')" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center opacity-99" >
          {/* <center>
            <img className="w-300" src="logo.jpg" alt="" />
          </center> */}
          <h2 className="text-xl font-bold bg-green-700 text-white mb-4 py-1 rounded">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label className="block text-gray-600 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4 text-left">
              <label className="block text-gray-600 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter password"
              />
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
