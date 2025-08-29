// components/ThreeDotLoader.jsx
import React from "react";

const ThreeDotLoader = ({ color = "bg-white", size = "w-1.5 h-1.5" }) => {
  return (
    <div className="flex space-x-1">
      <span className={`${size} ${color} rounded-full animate-bounce`}></span>
      <span className={`${size} ${color} rounded-full animate-bounce delay-150`}></span>
      <span className={`${size} ${color} rounded-full animate-bounce delay-300`}></span>
    </div>
  );
};

export default ThreeDotLoader;
