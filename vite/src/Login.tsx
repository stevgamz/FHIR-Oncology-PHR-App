import React, { useState } from "react";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <i className="fas fa-arrow-left text-gray-600"></i>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold mb-6">Log in</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email address or user name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-eye-slash absolute right-3 top-10 text-gray-500 cursor-pointer"></i>
          </div>
          <div className="mb-4 flex items-center">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="text-sm text-gray-700" htmlFor="remember-me">
              Remember me
            </label>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            By continuing, you agree to the{" "}
            <a href="#" className="text-blue-600">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
            .
          </p>
          <button
            className="w-full bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log in
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-gray-600">
            Forget your password
          </a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600">
              Sign up
            </a>
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-3 text-gray-600">Or continue with</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <i className="fab fa-facebook text-blue-600 text-2xl"></i>
          <i className="fab fa-apple text-gray-800 text-2xl"></i>
          <i className="fab fa-google text-red-600 text-2xl"></i>
          <i className="fab fa-twitter text-blue-400 text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Login;
