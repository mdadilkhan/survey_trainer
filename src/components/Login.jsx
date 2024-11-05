import React, { useState } from "react";
import Login from "../assets/Login.svg";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons
import { API_URL } from "../constant/APIConstant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slices/userSlices";


function UserLogin() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    console.log("you are in login handle");
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    await axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        if(res.status==200){
        dispatch(userDetails(res.data.data));
        setEmail("");
        setPassword("");
        navigate("/trainer-dashboard");}
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="w-full flex p-[10rem] mt-[15rem] justify-center gap-[10rem]">
      <div className="w-[30%] justify-end">
        {/* Image section */}
        <img src={Login} alt="Login Illustration" />
      </div>
      <div className="p-8 rounded-lg w-1/2">
        <h2 className="text-[3.2rem] font-nunito font-semibold text-p-1 text-left mb-2">
          Trainer Dashboard Login
        </h2>
        <p className="text-left font-nunito text-[1.6rem] mb-8">
          Welcome to Analytics Dashboards
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[1.4rem] font-nunito font-medium mb-2"
              htmlFor="email"
            >
              UserName
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-[44rem] h-[6rem] px-4 py-2 border rounded-2xl font-nunito font-normal text-[1.8rem]"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-[1.4rem] font-nunito font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-[44rem] h-[6rem] px-4 py-2 border rounded-2xl font-nunito font-normal text-[1.8rem] pr-12"
              required
            />
            {/* Eye icon for showing/hiding password */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-[44rem] bg-p-1 h-[6rem] px-4 py-2 border rounded-2xl font-nunito font-normal mt-[4rem] text-[2.4rem] text-white"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
