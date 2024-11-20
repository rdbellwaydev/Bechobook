import React from "react";

const Banner2 = () => {
  return (
    <div className="px-4 md:px-20 my-10 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* First Section */}
      <div className="relative w-full md:w-auto  ">
        <div className="absolute top-[10%] left-[5%] w-[90%] md:w-[60%]">
          <h1 className="text-[6vw] md:text-[3vw] lg:text-[2.5vw] text-[#303030] font-bold">
            BUY 3. GET 1 FREE
          </h1>
          <p className="text-[4vw] md:text-[2vw] lg:text-[1.5vw] text-[#575757] mt-2">
            50% off for Selected products in Smartbook.
          </p>
          <button className="bg-[#151515] px-[5%] py-[2%] mt-4 text-[4vw] md:text-[1.5vw] lg:text-[1vw] text-white active:scale-95">
            See More
          </button>
        </div>
        <img
          className="w-full md:w-[60vw] h-[30vh] md:h-[20vh] lg:h-[30vh] object-fill"
          src="src/assets/Banner2/255e215659a003a64c011cd63cc6f010.png"
          alt="Product Offer"
        />
      </div>

      {/* Second Section */}
      <div className="relative w-full md:w-auto ">
        <div className="absolute top-[10%] left-[5%] w-[90%] md:w-[60%] text-white">
          <h1 className="text-[6vw] md:text-[3vw] lg:text-[2.5vw] font-bold">
            $40.00
          </h1>
          <p className="text-[4vw] md:text-[2vw] lg:text-[1.5vw] mt-2">
            Praise For The Night Child
          </p>
          <button className="bg-[#151515] px-[5%] py-[2%] mt-4 text-[4vw] md:text-[1.5vw] lg:text-[1vw] text-white active:scale-95">
            See More
          </button>
        </div>
        <img
          className="w-full  md:w-[40vw] h-[30vh] md:h-[20vh] lg:h-[30vh] object-fill"
          src="src/assets/Banner2/b48fc1d3ad7f87ff804062f5d202cfbf.png"
          alt="Featured Book"
        />
      </div>
    </div>
  );
};

export default Banner2;
