import React from 'react'

const Banner3 = () => {
  return (
    <div className="w-full relative">
      {/* Text Section */}
      <div className="absolute top-[10%] lg:top-[20%] left-[5%] w-[90%] md:w-[50%] px-4 md:px-10">
        <h1 className="text-[4vw] md:text-[3vw] lg:text-[3vw] text-white font-bold">
          I Love This Idea!
        </h1>
        <p className="text-[3vw] md:text-[2vw] lg:text-[2vw] font-light text-white mt-2">
          Cover up front of book and leave summary
        </p>
        <button className="bg-[#151515] px-[4%] py-[2%] mt-4 text-[2vw] md:text-[2vw] lg:text-[2vw] text-white active:scale-95">
          Learn More
        </button>
      </div>

      {/* Background Image */}
      <img
        src="src/assets/Banner4/43e17809260bf2777a629d411532f84e.png"
        alt="Banner Background"
        className="w-full h-[20vh] md:h-[30vh] lg:h-[40vh] object-fill"
      />
    </div>
  );
}

export default Banner3
