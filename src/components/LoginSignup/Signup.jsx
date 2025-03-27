// import React from 'react';

// function SignupPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
//         {/* <div className="w-1/2 bg-blue-100 p-8 flex flex-col items-center justify-center">
//           <h2 className="text-2xl font-bold mb-4">Find 3D Objects, Mockups and Illustrations here</h2>
//           <div className="flex items-center justify-center">

//             <div className="w-32 h-32 bg-gray-300 rounded-full">

//             </div>
//           </div>
//         </div> */}
//         <div className="w-1/2 bg-blue-100 p-8 flex flex-col items-center justify-center">

//           <div className="flex items-center justify-center">
//             {/* Parent container for the image */}

//             {/* Image that takes up full width and height */}
//             <img
//               src='https://i.pinimg.com/736x/98/25/80/9825808a339b9cbd3362f3d2e381d244.jpg'
//               alt="3D Object"
//               className="w-full h-full object-cover"
//             />

//           </div>
//         </div>

//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//           <div className="flex space-x-4 mb-4">
//             <button className="w-1/2 bg-red-500 text-white py-2 rounded">Sign up with Google</button>
//             <button className="w-1/2 bg-blue-500 text-white py-2 rounded">Sign up with Facebook</button>
//           </div>
//           <div className="text-center mb-4">- OR -</div>
//           <form>
//             <div className="mb-4">
//               <label className="block text-gray-700">Full Name</label>
//               <input type="text" className="w-full px-4 py-2 border rounded" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email Address</label>
//               <input type="email" className="w-full px-4 py-2 border rounded" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input type="password" className="w-full px-4 py-2 border rounded" />
//             </div>
//             <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Create Account</button>
//           </form>
//           <div className="text-center mt-4">
//             <a href="#" className="text-blue-500">Already have an account? Log in</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupPage;
// import React from 'react';
// import Header from '../Header/Header';
// import Nav from '../Header/Nav';
// import Footer from '../Footer/Footer';
// const MeetingRequestForm = () => {
//   return (
//     <>
//     <Header/>
//     <Nav/>
//     <div className='flex justify-center items-center'>
//     <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-1/2 h-[480px] mt-12 mb-24">
//       {/* Image Section */}
//       <div className="bg-yellow-400 flex-1 flex items-center justify-center">
//         <img
//           src="https://i.pinimg.com/736x/0b/6c/b1/0b6cb1a71ca09f9eeff65bac7f4dda16.jpg"
//           alt="Design illustration"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Form Section */}
//       <div className="flex-1 p-6">
//         <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
//           Sign Up
//         </h2>
//         <form>
//           {/* Name Field */}
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Phone Field */}
//           <div className="mb-4">
//             <label
//               htmlFor="phone"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Phone:
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default MeetingRequestForm;

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
const MeetingRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(null);

  //   try {
  //     // Send POST request to the sign-up API
  //     const response = await axios.post(
  //       'https://bb.bechobookscan.com/api/user_register',
  //       formData
  //     );
  //     setSuccess('Registration successful!');
  //     // navigate('/login')
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 1000);
  //   } catch (err) {
  //     setError('Something went wrong. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://bb.bechobookscan.com/api/user_register",
        formData
      );

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: response.data.message || "You have successfully registered!",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
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
  <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-3/4 md:w-1/2 h-auto md:h-[520px] mt-12 mb-24">
    
    {/* Image Section */}
    <div className="bg-yellow-400 flex-1 flex items-center justify-center h-48 md:h-auto">
      <img
        src="https://i.pinimg.com/736x/0b/6c/b1/0b6cb1a71ca09f9eeff65bac7f4dda16.jpg"
        alt="Design illustration"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Form Section */}
    <div className="flex-1 p-4 md:p-6">
      <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
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

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-700">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
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
            {/* Eye Icon */}
            <span className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={togglePasswordVisibility}>
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
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {/* Already Registered? Sign in Link */}
          <p className="mt-4 text-sm text-gray-600">
            Already registered?{" "}
            <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
              Sign in
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

export default MeetingRequestForm;
