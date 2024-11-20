import React from 'react'

const Banner1 = () => {
  return (
    <div className="relative">
      <div className='w-full'>
        <img src="src/assets/Banner1/image.png" alt="" className='w-full'/>
      </div>
      <div className="px-10 absolute top-4 md:top-14 left-1/2">
        <h1 className="text-[4vw] text-[#303030] tracking-tight">J.D Kurtness</h1>
        <h1 className="text-[4vw] font-bold text-[#303030] tracking-tight">De Vengeance</h1>
        <h1 className="text-[3vw] font-light text-[#8f8f8f] leading-tight ">
          Cover up front of book and leave summary
        </h1>
        <button className="bg-[#151515] px-4 py-2 mt-4 md:mt-8 text-white active:scale-95 text-[1.5vw]">
          Shopping Now
        </button>
      </div>
    </div>
  );
}

export default Banner1
