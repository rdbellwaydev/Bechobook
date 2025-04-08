// import React, { useState } from 'react';
// import axios from 'axios';
// import Header from '../Header/Header';
// import { useNavigate } from 'react-router-dom'; 
// import Nav from '../Header/Nav';
// import Footer from '../Footer/Footer';

// const MeetingRequestForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });
//   const navigate = useNavigate(); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Handle form data change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Send POST request to the sign-up API
//       const response = await axios.post(
//         'https://bb.bechobookscan.com/api/user_register',
//         formData
//       );
//       setSuccess('Registration successful!');
//       // navigate('/login')
//       setTimeout(() => {
//         navigate('/login');
//       }, 1000);
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="flex justify-center items-center">
//         <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-1/2 h-[480px] mt-12 mb-24">
//           {/* Image Section */}
//           <div className="bg-yellow-400 flex-1 flex items-center justify-center">
//             <img
//               src="https://i.pinimg.com/736x/0b/6c/b1/0b6cb1a71ca09f9eeff65bac7f4dda16.jpg"
//               alt="Design illustration"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Form Section */}
//           <div className="flex-1 p-6">
//             <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
//               Login
//             </h2>
//             <form onSubmit={handleSubmit}>
//               {/* Name Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Email Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Phone Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="phone"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Phone:
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter your phone number"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="mb-6">
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//                   disabled={loading}
//                 >
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//             </form>

//             {/* Success/Error messages */}
//             {error && (
//               <div className="mt-4 text-center text-red-500">
//                 <p>{error}</p>
//               </div>
//             )}
//             {success && (
//               <div className="mt-4 text-center text-green-500">
//                 <p>{success}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MeetingRequestForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import Header from '../Header/Header';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import Nav from '../Header/Nav';
// import Footer from '../Footer/Footer';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate(); // Initialize navigate
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Handle form data change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Send POST request to the login API
//       const response = await axios.post(
//         'https://bb.bechobookscan.com/api/user_login',
//         formData
//       );

//       // Assuming successful login returns a token or user data
//       setSuccess('Login successful!');
//       // Redirect to the home page or dashboard after successful login
//       setTimeout(() => {
//         navigate('/'); // Adjust the route as per your requirement
//       }, 1000);
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="flex justify-center items-center">
//         <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-1/2 h-[400px] mt-12 mb-24">
//           {/* Image Section */}
//           <div className="bg-yellow-400 flex-1 flex items-center justify-center">
//             <img
//               src="https://i.pinimg.com/736x/e5/5a/38/e55a38e67e9e6b2276f0d4e6f2d9d421.jpg"
//               alt="Design illustration"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Form Section */}
//           <div className="flex-1 p-6">
//             <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
//               Login
//             </h2>
//             <form onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="mb-6">
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//                   disabled={loading}
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                 </button>
//               </div>
//             </form>

//             {/* Success/Error messages */}
//             {error && (
//               <div className="mt-4 text-center text-red-500">
//                 <p>{error}</p>
//               </div>
//             )}
//             {success && (
//               <div className="mt-4 text-center text-green-500">
//                 <p>{success}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import Swal from "sweetalert2";
import { useAuth } from '../Authentication/AuthContext'; // Import the AuthContext
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Base_url } from '../ApiController/ApiController';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate
  const { setAuthToken } = useAuth(); // Get the setAuthToken function from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Send POST request to the login API
      const response = await axios.post(
        Base_url+"user_login",
        formData
      );

      // Assuming successful login returns the token
      if (response.data.status) {
        // Store the token in localStorage
        localStorage.setItem("authtoken", response.data.token);

        // Set the authToken in context
        setAuthToken(response.data.token);

        // Show success message using Swal.fire
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in!",
          timer: 1500, // Auto close after 1.5 seconds
          showConfirmButton: false,
        });

        // Redirect to the dashboard or home page
        setTimeout(() => {
          navigate("/"); // Adjust the route as per your requirement
        }, 1500);
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (err) {
      // Show error message using Swal.fire
      Swal.fire({
        icon: "error",
        title: "Sign in Failed",
        text: err.response?.data?.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Nav />
      <div className="flex justify-center items-center px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto md:h-[400px] mt-12 mb-24">
          {/* Image Section */}
          <div className="bg-yellow-400 flex-1 flex items-center justify-center h-48 md:h-auto">
            <img
              src="https://i.pinimg.com/736x/e5/5a/38/e55a38e67e9e6b2276f0d4e6f2d9d421.jpg"
              alt="Design illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="flex-1 p-6">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
              Sign in
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  {/* Eye Icon Button */}
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Create Account Link */}
                <p className="mt-4 text-sm text-gray-600">
                  Not registered?{" "}
                  <span
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Create an account
                  </span>
                </p>
              </div>
            </form>

            {/* Success/Error messages */}
            {error && (
              <div className="mt-4 text-center text-red-500">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="mt-4 text-center text-green-500">
                <p>{success}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginForm;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../Header/Header";
// import { useNavigate } from "react-router-dom";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import Swal from "sweetalert2";
// import { useAuth } from "../Authentication/AuthContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const { setAuthToken } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if a token already exists in localStorage
//     const existingToken = localStorage.getItem("authtoken");
//     if (existingToken) {
//       setIsAlreadyLoggedIn(true);
//     }
//   }, []);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // If user is already logged in, show an alert
//     if (isAlreadyLoggedIn) {
//       Swal.fire({
//         icon: "warning",
//         title: "Already Logged In",
//         text: "You are already logged in. Please log out before trying to log in again.",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://bb.bechobookscan.com/api/user_login",
//         formData
//       );

//       if (response.data.status) {
//         localStorage.setItem("authtoken", response.data.token);
//         setAuthToken(response.data.token);

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: "You have successfully logged in!",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         setTimeout(() => {
//           navigate("/");
//         }, 1500);
//       } else {
//         throw new Error(response.data.message || "Login failed.");
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Sign in Failed",
//         text:
//           err.response?.data?.message ||
//           "Invalid credentials. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="flex justify-center items-center px-4">
//         <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto md:h-[400px] mt-12 mb-24">
//           {/* Image Section */}
//           <div className="bg-yellow-400 flex-1 flex items-center justify-center h-48 md:h-auto">
//             <img
//               src="https://i.pinimg.com/736x/e5/5a/38/e55a38e67e9e6b2276f0d4e6f2d9d421.jpg"
//               alt="Design illustration"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Form Section */}
//           <div className="flex-1 p-6">
//             <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
//               Sign in
//             </h2>

//             {isAlreadyLoggedIn && (
//               <div className="mb-4 text-center text-red-500 font-semibold">
//                 You are already logged in. Please log out before trying to log in again.
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   disabled={isAlreadyLoggedIn}
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="mb-6 relative">
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                 >
//                   Password:
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                     disabled={isAlreadyLoggedIn}
//                   />
//                   {/* Eye Icon Button */}
//                   <span
//                     onClick={togglePasswordVisibility}
//                     className="absolute right-3 top-3 cursor-pointer text-gray-600"
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
//                     isAlreadyLoggedIn ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   disabled={loading || isAlreadyLoggedIn}
//                 >
//                   {loading ? "Logging in..." : "Login"}
//                 </button>

//                 {/* Create Account Link */}
//                 {!localStorage.getItem("authtoken") && (
//   <p className="mt-4 text-sm text-gray-600">
//     Not registered?{" "}
//     <span
//       className="text-blue-500 hover:underline cursor-pointer"
//       onClick={() => navigate("/signup")}
//     >
//       Create an account
//     </span>
//   </p>
// )}

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default LoginForm;
