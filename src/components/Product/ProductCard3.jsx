import React from 'react'

const ProductCard3 = ({ img, title, desc, currentprice, mrp, discount }) => {
  return (
      <div className="h-[70vh] w-full ">
      <div className="h-[52vh] w-full overflow-hidden">
        <img className="w-full h-full scale-x-150" src={img} alt={title} />
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

        <div className="border-2 p-1 my-4 rounded w-full flex justify-center items-center">
          <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
            <span>4</span>
            <p>Hrs</p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
            <span>20</span>
            <p>Min</p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
            <span>12</span>
            <p>Sec</p>
          </div>
        </div>
      </div>
  );
};

export default ProductCard3
