import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  { role: "doctor", email: "doctor@example.com", password: "1234" },
  { role: "patient", email: "patient@example.com", password: "1234" },
];

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loginType, setLogintype] = React.useState("Doctor")
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const temp = USERS.filter(user => user.email === email)
    if (temp.length === 0) {
      setErrors("No Such Email Exists")
    } else {
      if (temp[0].role === loginType.toLocaleLowerCase()) {
        if (password === temp[0].password) {
          alert("login success")
          localStorage.setItem("token", JSON.stringify(temp[0]))
          navigate("/profile")
        } else {
          setErrors("invalid crendentials");
        }
      } else {
        setErrors(`Not a ${loginType}`)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back, {loginType}
        </h2>
        <div className="flex items-center justify-center gap-4 bg-gray-100 p-2 rounded-full w-fit mx-auto">
          <button
            onClick={() => setLogintype('Doctor')}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${loginType === 'Doctor'
              ? 'bg-green-400 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
          >
            Doctor Login
          </button>
          <button
            onClick={() => setLogintype('Patient')}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${loginType === 'Patient'
              ? 'bg-green-400 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
          >
            Patient Login
          </button>
        </div>

        <p className="text-center text-gray-500 mb-4 mt-2 ">
          Sign in
        </p>
        {errors !== "" && (
          <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded-md mb-4 text-sm">
            {errors}
          </div>
        )}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSignIn}
            className="w-full bg-green-400 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <span className="text-green-500 hover:underline cursor-pointer">
              Terms of Service
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
