import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
const Header = () => {
  return (
    <>
      <nav className="hidden md:inline">
        <div className=" w-full max-h-fit flex justify-between px-20 items-center bg-[#282828] text-white py-1  ">
          <div className="">
            <h1>
              <span>Ind</span>
              <i className="ri-arrow-down-s-line"></i>
            </h1>
          </div>

          <ul className="flex gap-10">
            <Link>
              <span className="mr-1 hidden sm:inline"> Wishlist</span>
              <i className="ri-poker-hearts-fill"></i>
            </Link>
            <Link>
              <span className="mr-1 hidden sm:inline">My Account</span>
              <i className="ri-user-3-fill"></i>
            </Link>
            <Link>
              <span className="mr-1 hidden sm:inline">Contact Us</span>
              <i className="ri-phone-fill"></i>
            </Link>
            <Link>
              <span className="mr-1 hidden sm:inline">Checkout</span>
              <i className="ri-shopping-bag-2-fill"></i>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
