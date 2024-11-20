import React from "react";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="bg-[#151515] md:bg-white ">
        {/* mobile view */}
        <div className="flex justify-between items-center py-8 px-4 md:hidden">
          <div className="flex gap-8">
            <i className="ri-menu-line text-white text-[5vw]"></i>
            <Link className="bg-white px-10  flex items-center active:scale-95">
              LOGO
            </Link>
          </div>
          <div className="flex gap-8">
            <i className="ri-search-line text-white text-[5vw]"></i>
            <Link className="ri-user-community-fill text-white text-[5vw]"></Link>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:inline w-full text-[1.2vw]">
          <div className="flex justify-between  px-20 py-4 items-center w-full">
            <Link  className="bg-[#151515] md:text-white px-5 py-1 w-fit">LOGO</Link>
            <ul className="flex gap-4 ">
              <Link to={"/"}>Home</Link>
              <Link >
                Catalog<i className="ri-arrow-down-s-line"></i>
              </Link>
              <Link >
                Specials<i className="ri-arrow-down-s-line"></i>
              </Link>
              <Link >
                Product Pages<i className="ri-arrow-down-s-line"></i>
              </Link>
              <Link >
                Categories<i className="ri-arrow-down-s-line"></i>
              </Link>
            </ul>
            <div className="flex gap-8 ">
              <input
                type="search"
                className="outline-none border-2 border-[#dfecce] rounded px-2 py-1"
                placeholder="Search Here"
              />
              <Link >
                <i className="ri-user-community-fill"> </i>
                <span>Sign in</span>
                <br className="lg:hidden"/>
                <span> or register</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
