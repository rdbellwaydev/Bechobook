import React from "react";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Home/bechobook.png"
const Footer = () => {
  return (
    <footer className="bg-[#eaeaec] py-10">
      <div className="mx-auto flex flex-col md:flex-row items-start justify-between w-[90vw] gap-8 md:gap-10">
        {/* Logo Section */}
        <div className="w-full md:w-1/4">
          {/* <Link to={"/"}><h1 className="bg-[#151515] text-white px-5 py-1 w-fit my-4">LOGO</h1></Link> */}
          <Link to="/" className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-18 w-20" />
          </Link>
          <p className="text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum.
          </p>
        </div>

        {/* Menu Section 1 */}
        <div className="w-full md:w-1/4">
          <h1 className="font-bold text-lg">Main Menu</h1>
          <div className="mt-4 space-y-2 text-sm flex flex-col">
            <Link to={'/'}>Home</Link>
            <Link to={'/about-us'}>About Us</Link>
            <Link to={'/get-in-touch'}>Contact Us</Link>
            {/* <Link>Product Page</Link>
            <Link>Categories</Link> */}
          </div>
        </div>

        {/* Menu Section 2 */}
        {/* <div className="w-full md:w-1/4">
          <h1 className="font-bold text-lg">Main Menu</h1>
          <div className="mt-4 space-y-2 text-sm flex flex-col">
            <Link>Home</Link>
            <Link>Catalog</Link>
            <Link>Specials</Link>
            <Link>Product Page</Link>
            <Link>Categories</Link>
          </div>
        </div> */}

        {/* Contact Section */}
        <div className="w-full md:w-1/4">
          <h1 className="font-bold text-lg">Contact Us</h1>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <i className="ri-mail-line"></i> bechobook214@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/"><i className="ri-linkedin-box-fill"></i> Linkedin </a>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.youtube.com/"><i className="ri-youtube-fill"></i> Youtube</a>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://twitter.com/"><i className="ri-twitter-x-line"></i> Twitter</a>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com/"><i className="ri-instagram-fill"></i> Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
