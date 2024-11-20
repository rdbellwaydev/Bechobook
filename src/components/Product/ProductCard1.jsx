import React from "react";


const ProductCard1 = ({ img, title, desc, currentprice, mrp, discount }) => {
  return (
    // Mobile card view
    <div className="h-[65vh] w-full">
      <div className="h-[52vh] w-full overflow-hidden ">
        <img
          className="w-full h-full scale-x-150  "
          src={img}
          alt={title}
        />
      </div>
      <div className="flex justify-between items-center px-2 my-4">
        <h4 className="text-md font-semibold">{title}</h4>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <div className="flex justify-between items-center px-2 my-4">
        <p className="font-bold">{currentprice}</p>
        <del className="text-gray-500">{mrp}</del>
        <p className="bg-[#bd0018] rounded-xl px-2 text-white">{discount}</p>
      </div>
    </div>
  );
};

export default ProductCard1;
