// import React from 'react'

// const ProductCard4 = ({ img, title, desc, currentprice, mrp, discount }) => {
//   return (
//     <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[40%] xl:w-[20%] bg-white overflow-hidden shadow rounded-md mx-auto">
//       <div className="h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[40vh] w-full overflow-hidden">
//         <img
//           className="w-full h-full object-cover scale-x-150"
//           src={img}
//           alt={title}
//         />
//       </div>
//       <div className="px-2 py-3">
//         <div className="flex justify-between items-center">
//           <h4 className="text-md font-semibold truncate hover:text-clip">
//             {title}
//           </h4>
//           <p className="text-gray-500 text-sm truncate hover:text-clip">
//             {desc}
//           </p>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <p className="font-bold text-lg">{currentprice}</p>
//           <del className="text-gray-500 text-sm">{mrp}</del>
//           <p className="bg-red-600 text-white rounded-xl px-2 py-1 text-sm">
//             {discount}
//           </p>
//         </div>
//         <div className="border-2 p-2 my-4 rounded w-full flex justify-center items-center">
//           <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
//             <span className="text-lg font-semibold">4</span>
//             <p className="text-sm">Hrs</p>
//           </div>
//           <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
//             <span className="text-lg font-semibold">20</span>
//             <p className="text-sm">Min</p>
//           </div>
//           <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
//             <span className="text-lg font-semibold">12</span>
//             <p className="text-sm">Sec</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard4
import React from 'react'

const ProductCard4 = ({ img, title, desc, currentprice, mrp, discount }) => {
  return (
    <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[40%] xl:w-[15%] bg-white overflow-hidden shadow rounded-md mx-auto">
      <div className="h-[200px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={img}
          alt={title}
        />
      </div>
      <div className="px-2 py-3">
        {/* <div className="flex justify-between items-center">
          <h4 className="text-md font-semibold truncate hover:text-clip">
            {title}
          </h4>
          <p className="text-gray-500 text-sm truncate hover:text-clip">
            {desc}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-lg">{currentprice}</p>
          <del className="text-gray-500 text-sm">{mrp}</del>
          <p className="bg-red-600 text-white rounded-xl px-2 py-1 text-sm">
            {discount}
          </p>
        </div> */}
         
        <div className="mb-2">
          <h4 className="text-md font-semibold leading-tight">{title}</h4>
          <p className="text-gray-500 text-sm">{desc}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-black">{currentprice}</span>
            <span className="line-through text-gray-500 text-sm">{mrp}</span>
          </div>
          <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            {discount}
          </span>
        
      </div>
        <div className="border-2 p-2 my-4 rounded w-full flex justify-center items-center">
          <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
            <span className="text-lg font-semibold">4</span>
            <p className="text-sm">Hrs</p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
            <span className="text-lg font-semibold">20</span>
            <p className="text-sm">Min</p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center text-gray-400">
            <span className="text-lg font-semibold">12</span>
            <p className="text-sm">Sec</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard4
