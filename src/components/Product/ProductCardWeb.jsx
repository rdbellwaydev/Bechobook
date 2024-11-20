import React from 'react'

const ProductCardWeb = ({ img, title, desc, currentprice, mrp, discount }) => {
  return (
    <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[40%] xl:w-[20%] bg-white overflow-hidden shadow rounded-md">
      <div className="h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[40vh] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover scale-x-150"
          src={img}
          alt={title}
        />
      </div>
      <div className="px-1 py-2">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-semibold  text-wrap  hover:text-clip">
            {title}
          </h4>
          <p className="text-gray-500 text-sm  text-wrap hover:text-clip">
            {desc}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-lg">{currentprice}</p>
          <del className="text-gray-500 text-sm">{mrp}</del>
          <p className="bg-red-600 text-white rounded-xl px-2 py-1 text-sm">
            {discount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWeb
