import React from "react";

const Card = ({ svg, title, desc }) => {
  return (
    <div className="flex w-[20%] gap-2 items-center border p-2 ">
      <div className="">{svg}</div>
      <div>
        <h1 className="text-[#333333] text-[1vw]">{title}</h1>
        <p className="text-[#8f8f8f] text-[1vw]">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
