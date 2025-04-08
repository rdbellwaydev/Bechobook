import React from "react";
import "remixicon/fonts/remixicon.css";
import Header from "../components/Header/Header";
import Nav from "../components/Header/Nav";
import Banner1 from "../components/Home/Banner1";
import { useEffect } from "react";
import Card from "../components/Home/Card";
import { useState } from "react";
import Video from "../components/Home/Video";
import Banner2 from "../components/Home/Banner2";
import Banner3 from "../components/Home/Banner3";
import Footer from "../components/Footer/Footer";
import ProductCard1 from "../components/Product/ProductCard1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import ProductCardWeb from "../components/Product/ProductCardWeb";
import ProductCard3 from "../components/Product/ProductCard3";
import ProductCard4 from "../components/Product/ProductCard4";
import Footer2 from "../components/Footer/Footer2";
import Blog from "../components/Blog/Blog";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/Home/image2.png"
import Image2 from "../assets/Home/image 9.png"
import Image3 from "../assets/Home/image 12.png"
import axios from "axios";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { useAuth } from "../components/Authentication/AuthContext";
import { useCart } from "../components/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Base_url } from "../components/ApiController/ApiController";
const Home = () => {
  const navigate = useNavigate();
  const cardDetails = [
    {
      svg: (
        <svg
          width="36"
          height="38"
          viewBox="0 0 36 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.6975 8.85273L19.26 0.953124C18.8742 0.739978 18.4407 0.628174 18 0.628174C17.5593 0.628174 17.1258 0.739978 16.74 0.953124L2.3025 8.85601C1.89019 9.08161 1.54601 9.41376 1.30591 9.81779C1.0658 10.2218 0.938567 10.6829 0.9375 11.1529V26.8438C0.938567 27.3138 1.0658 27.7749 1.30591 28.1789C1.54601 28.583 1.89019 28.9151 2.3025 29.1407L16.74 37.0436C17.1258 37.2567 17.5593 37.3685 18 37.3685C18.4407 37.3685 18.8742 37.2567 19.26 37.0436L33.6975 29.1407C34.1098 28.9151 34.454 28.583 34.6941 28.1789C34.9342 27.7749 35.0614 27.3138 35.0625 26.8438V11.1545C35.0623 10.6837 34.9355 10.2216 34.6953 9.81663C34.4552 9.41165 34.1105 9.07873 33.6975 8.85273ZM18 3.25L31.1824 10.4687L26.2966 13.1413L13.1142 5.92258L18 3.25ZM18 17.6875L4.81758 10.4687L10.3809 7.42211L23.5634 14.6409L18 17.6875ZM32.4375 26.8504L19.3125 34.0347V19.9565L24.5625 17.0837V22.9375C24.5625 23.2856 24.7008 23.6194 24.9469 23.8656C25.1931 24.1117 25.5269 24.25 25.875 24.25C26.2231 24.25 26.5569 24.1117 26.8031 23.8656C27.0492 23.6194 27.1875 23.2856 27.1875 22.9375V15.6466L32.4375 12.7738V26.8438V26.8504Z"
            fill="#151515"
          />
        </svg>
      ),
      title: "Free Shipping Item",
      desc: "Order Over $500",
    },
    {
      svg: (
        <svg
          width="36"
          height="38"
          viewBox="0 0 36 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_6_769)">
            <path
              d="M36.75 21C36.7501 24.0763 35.8493 27.0853 34.1588 29.6555C32.4683 32.2256 30.0621 34.2445 27.2373 35.4627C24.4125 36.681 21.2928 37.0454 18.2633 36.5109C15.2338 35.9763 12.4272 34.5663 10.1899 32.4549C10.0645 32.3364 9.96371 32.1944 9.89321 32.0369C9.82271 31.8794 9.78391 31.7096 9.77904 31.5372C9.77416 31.3647 9.8033 31.193 9.86479 31.0318C9.92629 30.8706 10.0189 30.7231 10.1374 30.5977C10.3767 30.3445 10.7069 30.1967 11.0551 30.1868C11.2276 30.1819 11.3993 30.2111 11.5605 30.2726C11.7217 30.3341 11.8692 30.4267 11.9946 30.5452C13.8711 32.3155 16.2276 33.4935 18.7697 33.9321C21.3119 34.3707 23.9269 34.0505 26.2881 33.0114C28.6493 31.9723 30.6519 30.2604 32.0457 28.0897C33.4395 25.9189 34.1627 23.3855 34.1249 20.8061C34.0872 18.2267 33.2901 15.7156 31.8333 13.5865C30.3766 11.4575 28.3247 9.805 25.9341 8.83546C23.5435 7.86592 20.9203 7.62237 18.392 8.13522C15.8638 8.64807 13.5428 9.8946 11.719 11.719C11.1398 12.3047 10.5952 12.8806 10.0652 13.4532L12.7411 16.134C12.9249 16.3175 13.05 16.5515 13.1008 16.8062C13.1515 17.0609 13.1255 17.325 13.0261 17.565C12.9266 17.8049 12.7583 18.01 12.5422 18.1542C12.3262 18.2984 12.0722 18.3753 11.8125 18.375H5.25C4.9019 18.375 4.56806 18.2368 4.32192 17.9906C4.07578 17.7445 3.9375 17.4106 3.9375 17.0625V10.5C3.9373 10.2403 4.01416 9.98635 4.15837 9.77032C4.30257 9.55429 4.50763 9.38591 4.74759 9.28648C4.98754 9.18706 5.2516 9.16106 5.50634 9.21179C5.76108 9.26252 5.99503 9.38769 6.17859 9.57145L8.20313 11.5993C8.73141 11.0267 9.27609 10.4508 9.85359 9.86841C12.0555 7.6628 14.8622 6.16001 17.9185 5.55025C20.9748 4.94049 24.1433 5.25118 27.023 6.44299C29.9027 7.6348 32.364 9.65416 34.0955 12.2455C35.827 14.8368 36.7508 17.8835 36.75 21ZM21 11.8125C20.6519 11.8125 20.3181 11.9508 20.0719 12.197C19.8258 12.4431 19.6875 12.777 19.6875 13.125V21C19.6874 21.2266 19.746 21.4494 19.8576 21.6466C19.9691 21.8438 20.1298 22.0088 20.3241 22.1255L26.8866 26.063C27.0344 26.1518 27.1982 26.2106 27.3687 26.236C27.5392 26.2615 27.7131 26.2531 27.8804 26.2113C28.0476 26.1696 28.2051 26.0953 28.3436 25.9927C28.4822 25.8902 28.5992 25.7613 28.688 25.6135C28.7767 25.4657 28.8355 25.3019 28.861 25.1313C28.8864 24.9608 28.878 24.787 28.8363 24.6197C28.7945 24.4524 28.7203 24.295 28.6177 24.1564C28.5151 24.0179 28.3862 23.9008 28.2384 23.8121L22.3125 20.2568V13.125C22.3125 12.777 22.1742 12.4431 21.9281 12.197C21.6819 11.9508 21.3481 11.8125 21 11.8125Z"
              fill="#151515"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_769">
              <rect width="42" height="42" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Money Back Guarantee",
      desc: "100% Money back",
    },
    {
      svg: (
        <svg
          width="36"
          height="38"
          viewBox="0 0 40 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.0706 2.84373C38.8817 2.7258 38.6658 2.6579 38.4434 2.64642C38.2209 2.63494 37.9992 2.68026 37.7991 2.7781C30.7559 6.22342 25.7258 4.60904 20.4085 2.90607C14.8156 1.12599 9.04062 -0.719708 1.04914 3.1817C0.828438 3.28946 0.642398 3.45698 0.512176 3.66522C0.381953 3.87346 0.312773 4.11406 0.3125 4.35967V24.0357C0.312469 24.2584 0.369099 24.4774 0.477061 24.6722C0.585024 24.8669 0.740768 25.031 0.929637 25.149C1.11851 25.267 1.33429 25.335 1.55668 25.3466C1.77907 25.3582 2.00075 25.313 2.20086 25.2153C9.24406 21.77 14.2742 23.3844 19.5997 25.0873C22.7563 26.0963 25.9719 27.125 29.6075 27.125C32.4113 27.125 35.4695 26.5147 38.9443 24.8183C39.165 24.7105 39.351 24.543 39.4813 24.3347C39.6115 24.1265 39.6807 23.8859 39.6809 23.6403V3.96428C39.6829 3.74101 39.6279 3.52093 39.5211 3.32485C39.4143 3.12877 39.2593 2.96317 39.0706 2.84373ZM6.875 17.9375C6.875 18.2856 6.73672 18.6194 6.49058 18.8656C6.24444 19.1117 5.9106 19.25 5.5625 19.25C5.2144 19.25 4.88056 19.1117 4.63442 18.8656C4.38828 18.6194 4.25 18.2856 4.25 17.9375V7.43748C4.25 7.08938 4.38828 6.75554 4.63442 6.5094C4.88056 6.26326 5.2144 6.12498 5.5625 6.12498C5.9106 6.12498 6.24444 6.26326 6.49058 6.5094C6.73672 6.75554 6.875 7.08938 6.875 7.43748V17.9375ZM20 19.25C18.9616 19.25 17.9466 18.9421 17.0833 18.3652C16.2199 17.7883 15.547 16.9684 15.1496 16.0091C14.7523 15.0498 14.6483 13.9942 14.8509 12.9758C15.0534 11.9574 15.5535 11.0219 16.2877 10.2877C17.0219 9.55344 17.9574 9.05343 18.9758 8.85086C19.9942 8.64828 21.0498 8.75225 22.0091 9.14961C22.9684 9.54697 23.7883 10.2199 24.3652 11.0832C24.9421 11.9466 25.25 12.9616 25.25 14C25.25 15.3924 24.6969 16.7277 23.7123 17.7123C22.7277 18.6969 21.3924 19.25 20 19.25ZM35.75 20.5625C35.75 20.9106 35.6117 21.2444 35.3656 21.4906C35.1194 21.7367 34.7856 21.875 34.4375 21.875C34.0894 21.875 33.7556 21.7367 33.5094 21.4906C33.2633 21.2444 33.125 20.9106 33.125 20.5625V10.0625C33.125 9.71438 33.2633 9.38054 33.5094 9.1344C33.7556 8.88826 34.0894 8.74998 34.4375 8.74998C34.7856 8.74998 35.1194 8.88826 35.3656 9.1344C35.6117 9.38054 35.75 9.71438 35.75 10.0625V20.5625Z"
            fill="#151515"
          />
        </svg>
      ),
      title: "Cash On Delivery",
      desc: "Order Over $500",
    },
    {
      svg: (
        <svg
          width="36"
          height="38"
          viewBox="0 0 36 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 0.9375C14.6254 0.9375 11.3265 1.9382 8.52059 3.81305C5.71468 5.6879 3.52773 8.3527 2.23631 11.4705C0.944893 14.5882 0.606999 18.0189 1.26536 21.3287C1.92372 24.6385 3.54876 27.6788 5.935 30.065C8.32123 32.4512 11.3615 34.0763 14.6713 34.7346C17.9811 35.393 21.4118 35.0551 24.5295 33.7637C27.6473 32.4723 30.3121 30.2853 32.187 27.4794C34.0618 24.6735 35.0625 21.3746 35.0625 18C35.0577 13.4762 33.2585 9.13907 30.0597 5.94027C26.8609 2.74146 22.5238 0.942277 18 0.9375ZM12.75 18C12.75 16.9616 13.0579 15.9466 13.6348 15.0833C14.2117 14.2199 15.0316 13.547 15.9909 13.1496C16.9502 12.7523 18.0058 12.6483 19.0242 12.8509C20.0426 13.0534 20.9781 13.5535 21.7123 14.2877C22.4465 15.0219 22.9466 15.9574 23.1491 16.9758C23.3517 17.9942 23.2477 19.0498 22.8504 20.0091C22.453 20.9684 21.7801 21.7883 20.9167 22.3652C20.0534 22.9421 19.0384 23.25 18 23.25C16.6076 23.25 15.2723 22.6969 14.2877 21.7123C13.3031 20.7277 12.75 19.3924 12.75 18ZM27.2334 6.90938L22.5593 11.5852C21.2287 10.6356 19.6347 10.1251 18 10.1251C16.3653 10.1251 14.7713 10.6356 13.4407 11.5852L8.76657 6.90938C11.3575 4.74686 14.6252 3.56234 18 3.56234C21.3748 3.56234 24.6425 4.74686 27.2334 6.90938ZM8.76657 29.0906L13.4407 24.4148C14.7713 25.3645 16.3653 25.8749 18 25.8749C19.6347 25.8749 21.2287 25.3645 22.5593 24.4148L27.2334 29.0906C24.6425 31.2531 21.3748 32.4377 18 32.4377C14.6252 32.4377 11.3575 31.2531 8.76657 29.0906Z"
            fill="#151515"
          />
        </svg>
      ),
      title: "Help & Support",
      desc: "Order Over $500",
    },
  ];
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({
    "Featured Products": [],
    "New Arrivals": [],
    "Most Viewed": [],
  });

  const [activeCategory, setActiveCategory] = useState("Featured Products"); // Default tab
  const [products1, setProducts1] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const [leftBanner, setLeftBanner] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  const [rightBanner, setRightBanner] = useState(null);
  const { authToken } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const categoryMap = {
    "Featured Products": "featured",
    "New Arrivals": "new_arrivals",
    "Most Viewed": "most_viewed",
  };
  useEffect(() => {
    const fetchCartData = async () => {
      if (!authToken) {
        console.warn("Auth Token is missing!");
        return;
      }
  
      console.log("Fetching cart data...");
  
      setLoading(true); // ✅ Set loading before fetching
  
      try {
        const response = await fetch(
          `${Base_url}getCart?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
  
        console.log("API Response Status:", response.status);
  
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
  
        const data = await response.json();
        console.log("Cart Data:", data); // ✅ Debugging log
  
        // ✅ Ensure valid data before updating state
        setCartItems(data.data || []);
        setTotalPrice(data.total_price ?? 0);
        setTotalPages(data.pagination?.last_page ?? 1);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };
  
    fetchCartData();
  }, [authToken, currentPage]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${Base_url}getBooksByCatalog?catalogs=${categoryMap[activeCategory]}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.status && data.data.length > 0) {
          const categorizedBooks = data.data.map((item) => ({
            id: item.id,
            img: item.book.image,
            title: item.book.title,
            desc: item.book.synopsis || "No description available",
            currentprice: `$${item.price}`,
            mrp: `$${item.mrp}`,
            discount: `${item.discount}% OFF`,
          }));

          setProducts((prev) => ({
            ...prev,
            [activeCategory]: categorizedBooks,
          }));
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [activeCategory]); // Fetch data when activeCategory changes
  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(Base_url+"getCategory");
        const data = await response.json();
        if (data.status) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const NextArrow = ({ onClick }) => (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 cursor-pointer bg-white shadow-md p-2 rounded-full" onClick={onClick}>
      <i className="ri-arrow-right-s-line text-2xl text-gray-700 hover:text-gray-900"></i>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 cursor-pointer bg-white shadow-md p-2 rounded-full" onClick={onClick}>
      <i className="ri-arrow-left-s-line text-2xl text-gray-700 hover:text-gray-900"></i>
    </div>
  );
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   responsive: [
  //     { breakpoint: 1024, settings: { slidesToShow: 4 } },
  //     { breakpoint: 768, settings: { slidesToShow: 3 } },
  //     { breakpoint: 480, settings: { slidesToShow: 4 } },
  //   ],
  // };
  const settings = {
    dots: false,
    infinite: true, 
    speed: 500,
    slidesToShow: 5, // Default for desktop
    slidesToScroll: 4, // Scroll 4 items at a time
    swipe: true, // Enable touch swipe
    touchMove: true, // Allow smooth scrolling
    nextArrow: window.innerWidth > 768 ? <NextArrow /> : null,
    prevArrow: window.innerWidth > 768 ? <PrevArrow /> : null,
    responsive: [
      { 
        breakpoint: 1024, 
        settings: { slidesToShow: 4, slidesToScroll: 4 } // Scroll 4 per swipe
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 4, 
          slidesToScroll: 4, // Move 4 at a time on swipe
          nextArrow: null,
          prevArrow: null, // Hide arrows on mobile
          swipe: true,
          touchMove: true,
          variableWidth: false, // Keep fixed width for equal spacing
          centerMode: false, // No centering, just smooth swiping
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 3, // Show 3 slides at a time
          slidesToScroll: 3, // Move 3 per swipe
          nextArrow: null,
          prevArrow: null, // Hide arrows
          swipe: true,
          touchMove: true,
          variableWidth: false, // Even spacing
          centerMode: false, // Disable centering
        } 
      },
    ],
  };
  
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Fetch Left Banner
        const leftResponse = await axios.get(
          Base_url+"getLeftBanner"
        );
        if (leftResponse.data.status && leftResponse.data.data.length > 0) {
          setLeftBanner(leftResponse.data.data[0].image);
        }

        // Fetch Right Banner
        const rightResponse = await axios.get(
          Base_url+"getRightBanner"
        );
        if (rightResponse.data.status && rightResponse.data.data.length > 0) {
          setRightBanner(rightResponse.data.data[0].image);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchLeftBanner = async () => {
      try {
        const response = await axios.get(
          Base_url+"getLeftBanner"
        );
        if (response.data.status && response.data.data.length > 0) {
          setLeftBanner(response.data.data[0].image);
        }
      } catch (error) {
        console.error("Error fetching left banner:", error);
      }
    };

    fetchLeftBanner();
  }, []);
 
  // const handleAddToCart = async (product) => {
  //   if (!authToken) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "You are not logged in!",
  //       text: "Please log in to add items to your cart.",
  //       confirmButtonText: "Login",
  //       showCancelButton: true,
  //       cancelButtonText: "Cancel",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate("/login");
  //       }
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${authToken}`,
  //       },
  //       body: JSON.stringify({ book_id: product.id }),
  //     });

  //     const data = await response.json();

  //     if (data.status) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Added to Cart",
  //         text: "Book added to cart successfully!",
  //       }).then(() => {
  //         navigate("/cart"); // Navigate to cart page
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed to Add",
  //         text: data.message || "Failed to add book to cart.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message || "Something went wrong. Please try again.",
  //     });
  //   }
  // };
const handleAddToCart = async (product) => {
    if (!authToken) {
      Swal.fire({
        icon: "warning",
        title: "You are not logged in!",
        text: "Please log in to add items to your cart.",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
  
    // // Check if the product is already in the cart
    // const isProductInCart = cartItems.some((item) => item.book_id === product.id);
  
    // if (isProductInCart) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Already in Cart",
    //     text: "This book is already in your cart!",
    //   });
    //   return;
    // }
  
    try {
      const response = await fetch(Base_url+"addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ book_id: product.id }), // Ensure the correct field is sent
      });
  
      const data = await response.json();
  
      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Book added to cart successfully!",
        }).then(() => {
          // navigate("/cart");
        });
  
        // Update the cartItems state with the new item
        setCartItems((prevItems) => [
          ...prevItems,
          { ...product, book_id: product.id }, // Ensure the correct structure
        ]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: data.message || "Failed to add book to cart.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };
 
  useEffect(() => {
    const fetchDiscountedBooks = async () => {
      try {
        const response = await fetch(Base_url+"getAllDiscountedBooks");
        const data = await response.json();

        if (data.status && data.data) {
          // Transform API response to match the UI structure
          const formattedProducts = data.data.map((item) => ({
            id: item.id,
            img: item.book.image,
            title: item.book.title,
            currentprice: `₹${item.price}`,
            mrp: `₹${item.mrp}`,
            discount: item.discount ? `${item.discount}% OFF` : null
          }));

          setProducts1(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedBooks();
  }, []);
  useEffect(() => {
    const fetchBestSellingBooks = async () => {
      try {
        const response = await fetch(Base_url+"getBestSellingBooks");
        const data = await response.json();

        if (data.status && data.data) {
          // Extract books from multiple users
          const extractedBooks = data.data.flatMap((order) => order.books);
          setBooks(extractedBooks);
        }
      } catch (error) {
        console.error("Error fetching best-selling books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellingBooks();
  }, []);

  const handleAddtoBulk = () => {
    navigate('/bulk-booking')
  }

  const handleLoadMore = () => {
    setVisibleCount(products1.length); // Show all remaining products
  };
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-screen h-full">
      <Header />
      <Nav />
      <Banner1 />

      {/* service cards */}
      {/* <div className="hidden md:inline">
        <div className="flex items-center justify-between px-20 my-10">
          {cardDetails.map((dets, idx) => (
            <Card
              key={idx}
              svg={dets.svg}
              title={dets.title}
              desc={dets.desc}
            />
          ))}
        </div>
      </div> */}
      <div className="relative mt-12 py-3 px-1"> {/* Reduced padding */}
        <Slider
          {...settings}
          slidesToShow={7.2} // More slides in view to reduce gap
          slidesToScroll={1}
        >
          {categories.map((category) => (
            <div key={category.id} className="text-center px-[2px]"> {/* Minimized spacing */}
              <Link to={`/category/${category.id}`} className="flex flex-col items-center gap-y-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-yellow-400 flex items-center justify-center">
                  <img
                    src={category.image || "https://via.placeholder.com/100"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate w-20">
                  {category.name}
                </span>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex items-center justify-center mt-10 mb-10">
        {/* Trigger Button */}
        <button
          className="flex items-center gap-3 bg-black text-white 
             px-8 py-3 rounded-full font-extrabold text-lg tracking-wider shadow-xl 
             hover:bg-gray-900 transform transition-all duration-300 ease-in-out 
             hover:scale-110 border-2 border-transparent hover:border-red-500 animate-pulse"
          onClick={handleAddtoBulk}
        >

          Bulk Order
        </button>
        {/* Modal */}
        {/* {isOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">

              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Choose the plan that's right for you</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto h-[80vh]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => (
                    <div
                      key={index}
                      className="border rounded-lg shadow-md overflow-hidden"
                    >
                      {plan.popular && (
                        <div className="bg-purple-600 text-white text-center py-1 font-semibold">
                          Most Popular
                        </div>
                      )}

              
                      <div className={`${plan.gradient} p-4 text-white`}>
                        <h3 className="text-xl font-bold">{plan.title}</h3>
                        <p className="text-sm">{plan.qty}</p>
                      </div>

                  
                      <div className="p-6 space-y-4 text-gray-800">
                        <div>
                          <p className="font-semibold text-gray-900">Price</p>
                          <p className="text-lg font-500">{plan.price}</p>
                          <hr className="my-4 border-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Book list</p>
                          <p className="text-lg font-500">Available</p>
                          <hr className="my-4 border-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">New : Used Ratio</p>
                          <p className="text-lg font-500">{plan.ratio}</p>
                          <hr className="my-4 border-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Total MRP of books (Approx)</p>
                          <p className="text-lg font-500"> {plan.mrp}</p>
                          <hr className="my-4 border-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Discount</p>
                          <p className="text-lg font-500"> {plan.mrp}</p>
                          <hr className="my-4 border-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Doorstep Delivery Charges</p>
                          <p className="text-lg font-500"> {plan.delivery}</p>
                          <hr className="my-4 border-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Category</p>
                          <p className="text-lg font-500"> {plan.category}</p>
                          <hr className="my-4 border-gray-300" />
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )} */}

      </div>

      {/* sale banners */}
      {/* <div className="w-full px-4 md:px-20  flex flex-col md:flex-row items-center justify-between gap-[7%] ">
        <div className="w-full md:w-1/2 my-6">
          <img
            src="src\assets\Home\d25634b4fca6a453cb2a929962588890.png"
            alt="No image"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2 my-1">
          <img
            src="src\assets\Home\ff7d48960a1e84d5c7c5b6feda8287b8.png"
            alt="No image"
            className="w-full rounded-xl"
          />
        </div>
      </div> */}
      {/* <div className="w-full px-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-[7%]"> */}
      {/* Dynamic Left Banner */}
      {/* <div className="w-full md:w-1/2 my-6">
          {leftBanner ? (
            <img
              src={leftBanner}
              alt="Left Banner"
              className="w-full rounded-xl"
            />
          ) : (
            <p>Loading...</p> // Show a loading state while fetching
          )}
        </div> */}

      {/* Static Right Banner */}
      {/* <div className="w-full md:w-1/2 my-1">
          <img
            src="src/assets/Home/ff7d48960a1e84d5c7c5b6feda8287b8.png"
            alt="Right Banner"
            className="w-full rounded-xl"
          />
        </div> */}
      {/* <div className="w-full md:w-1/2 my-1">
          {rightBanner ? (
            <img
              src={rightBanner}
              alt="Right Banner"
              className="w-full rounded-xl"
            />
          ) : (
            <p>Loading...</p> // Show a loading state while fetching
          )}
        </div>
      </div> */}
      {/* products navigation */}
      {/* <div className="w-full px-4 md:px-20 my-4 flex justify-between text-[2vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.2vw] ">
        {Object.keys(products).map((category) => (
          <h1
            key={category}
            className={`cursor-pointer border-b-2 pb-1 px-8 md:px-[8vw] lg:px-[10vw] font-medium ${activeCategory === category
              ? "border-gray-900"
              : "border-gray-400 text-gray-400"
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </h1>
        ))}
      </div> */}



      {/* <div className="w-full px-4 md:px-20 my-4 flex flex-col">
    
      <div className="flex justify-between text-[2vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.2vw]">
        {Object.keys(products).map((category) => (
          <h1
            key={category}
            className={`cursor-pointer border-b-2 pb-1 px-8 md:px-[8vw] lg:px-[10vw] font-medium ${
              activeCategory === category ? "border-gray-900" : "border-gray-400 text-gray-400"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </h1>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products[activeCategory].map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
            <h2 className="font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-500">{product.desc}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold">{product.currentprice}</span>
              <span className="text-sm line-through text-gray-400">{product.mrp}</span>
              <span className="text-red-500">{product.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </div> */}

      {/* <div className="w-full px-4 md:px-20 my-4 flex flex-col">
      
        <div className="flex justify-between text-[2vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.2vw]">
          {Object.keys(products).map((category) => (
            <h1
              key={category}
              className={`cursor-pointer border-b-2 pb-1 px-8 md:px-[8vw] lg:px-[10vw] font-medium ${activeCategory === category ? "border-gray-900" : "border-gray-400 text-gray-400"
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </h1>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="max-w-6xl mx-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
              {products[activeCategory]?.slice(0, 10).map((product) => (  // Slice first 10 books
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
                  onClick={() => navigate(`/product/${product.id}`)} // Navigate to product page
                >
                  <img src={product.img} alt={product.title} className="w-full h-45 object-contain" />
                  <h2 className="font-semibold mt-2 truncate w-full">{product.title}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-black">{product.currentprice}</span>
                    <span className="text-gray-400 line-through text-sm">{product.mrp}</span>
                  </div>
                  {product.discount && product.discount !== "null% OFF" ? (
                    <div className="flex items-center justify-between mt-1">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount.replace("null% OFF", "").trim()}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div> */}
      <div className="w-full px-4 md:px-20 my-4 flex flex-col">
        <div className="flex justify-between text-[2vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.2vw]">
          {Object.keys(products).map((category) => (
            <h1
              key={category}
              className={`cursor-pointer border-b-2 pb-1 px-8 md:px-[8vw] lg:px-[10vw] font-medium ${activeCategory === category ? "border-gray-900" : "border-gray-400 text-gray-400"
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </h1>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="max-w-6xl mx-5 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
              {products[activeCategory]?.slice(0, 10).map((product) => (
                <div
                  key={product.id}
                  className="relative border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 max-sm:p-2 max-sm:scale-95 flex flex-col justify-between" // Added "flex flex-col justify-between"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-45 object-contain max-sm:h-[100px]" // Smaller image on mobile
                  />
                  <h2 className="font-semibold mt-2 truncate w-full max-sm:text-sm"> {/* Smaller text on mobile */}
                    {product.title}
                  </h2>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-black max-sm:text-base"> {/* Smaller text on mobile */}
                      ₹{product.currentprice.replace(/\$/g, "")}
                    </span>
                    <span className="text-orange-400 line-through text-sm max-sm:text-xs"> {/* Smaller text on mobile */}
                      ₹{product.mrp.replace(/\$/g, "")}
                    </span>
                  </div>
                  {product.discount && product.discount !== "null% OFF" ? (
                    <div className="flex items-center justify-between mt-1">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full max-sm:text-[10px]"> {/* Smaller text on mobile */}
                        {product.discount.replace("null% OFF", "").trim()}
                      </span>
                    </div>
                  ) : null}

                  {/* Cart Button Wrapper */}
                  <div className="flex justify-end items-center mt-2"> {/* Ensures button stays at the bottom */}
                    <button
                      className="bg-white border border-gray-300 p-2 rounded-full shadow-md transition hover:bg-gray-200 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating to product page
                        handleAddToCart(product);
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                        alt="Add to Cart"
                        className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                      />
                    </button>
                  </div>
                </div>


              ))}
            </div>
          </div>
        </div>
      </div>
      {/* deal of the day heading */}
      <div className="flex justify-center my-10">
        <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg md:text-2xl font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
          🔥 Deal of the Day 🔥
        </button>
      </div>

      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-0">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-lg font-semibold">Loading books...</p>
          ) : (
            <>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full"> */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
                {products1.slice(0, visibleCount).map((product) => (
                  <div
                    key={product.id}
                    className="relative border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-45 object-contain max-sm:h-[100px]"
                    />
                    <h2 className="font-semibold mt-2 truncate w-full">{product.title}</h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-black">{product.currentprice}</span>
                      <span className="text-orange-400 line-through text-sm">{product.mrp}</span>
                    </div>
                    {product.discount && (
                      <div className="flex items-center justify-between mt-1">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {product.discount}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-end items-center mt-2"> {/* Ensures button stays at the bottom */}
                      <button
                        className="bg-white border border-gray-300 p-2 rounded-full shadow-md transition hover:bg-gray-200 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigating to product page
                          handleAddToCart(product);
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                          alt="Add to Cart"
                          className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCount < products1.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition m-10"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* best sellers heading*/}
      {/* <div className="w-[80vw] mx-auto my-10  ">
        <h1 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600">
          Best sellers
        </h1>
      </div> */}
      {/*best seller mobile cards */}
      {/* <div className="px-4 md:hidden py-2">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
        >
          {bestSellers.map((product, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard1
                img={product.img}
                title={product.title}
                desc={product.desc}
                currentprice={product.currentprice}
                mrp={product.mrp}
                discount={product.discount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      {/*best sellers desktop cards */}
      {/* <div className="hidden md:inline">
        <div className="flex px-20 flex-wrap gap-10">
          {bestSellers.map((product, idx) => (
            <ProductCard4
              key={idx}
              img={product.img}
              title={product.title}
              desc={product.desc}
              currentprice={product.currentprice}
              mrp={product.mrp}
              discount={product.discount}
            />
          ))}
        </div>
      </div> */}

      {/* <div className="flex flex-col justify-center items-center min-h-screen">
       
        <h1 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mt-12">
          Best Sellers
        </h1>

        <div className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-0">
          {loading ? (
            <p className="text-center text-lg font-semibold">Loading books...</p>
          ) : (
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
              {books.map((book) =>
                book.title && book.image ? ( // Ensure book has valid data
                  <div
                    key={book.id}
                    className="relative border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
                    onClick={() => navigate(`/product/${book.id}`)}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-45 object-contain max-sm:h-[100px]"
                    />
                    <h2 className="font-semibold mt-2 truncate w-full">{book.title}</h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-black">₹{book.price}</span>
                    </div>
                    <div className="flex justify-end items-center mt-2"> 
                      <button
                        className="bg-white border border-gray-300 p-2 rounded-full shadow-md transition hover:bg-gray-200 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigating to product page
                          handleAddToCart(book);
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                          alt="Add to Cart"
                          className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                        />
                      </button>
                    </div>
                  </div>
                ) : null

              )}
            </div>
          )}
        </div>
      </div> */}
{books.length > 0 && (
  <div className="flex flex-col justify-center items-center min-h-screen">
    {/* Heading */}
    <h1 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mt-12">
      Best Sellers
    </h1>

    {/* Books Container */}
    <div className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-0">
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading books...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
          {books.map((book) =>
            book.title && book.image ? ( // Ensure book has valid data
              <div
                key={book.id}
                className="relative border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
                onClick={() => navigate(`/product/${book.id}`)}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-45 object-contain max-sm:h-[100px]"
                />
                <h2 className="font-semibold mt-2 truncate w-full">{book.title}</h2>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-black">₹{book.price}</span>
                </div>
                <div className="flex justify-end items-center mt-2">
                  <button
                    className="bg-white border border-gray-300 p-2 rounded-full shadow-md transition hover:bg-gray-200 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigating to product page
                      handleAddToCart(book);
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                      alt="Add to Cart"
                      className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                    />
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  </div>
)}

      {/* videoplayer */}
      <div className="flex justify-center items-center">
        <div className="w-3/4">
          <Video src="src/assets/Home/booksVideo.mp4" />
        </div>
      </div>



      {/* <Banner2 />
      <Banner3 /> */}

      {/*Latest Blogs heading*/}
      {/* <div className="w-[80vw] mx-auto my-10  ">
        <h1 className="text-center text-3xl border-b-4 w-fit mx-auto mb-10 pb-2 rounded border-lime-600">
          Latest Blogs
        </h1>
      </div> */}
      {/* Mobile slide */}
      {/* <Blog /> */}


      {/* Our Partners */}
      {/* <div className="flex gap-10 animate-marquee px-4 md:px-20 my-4 overflow-x-hidden">
        <img
          src={Image1}
          className="border-2 w-[200px]"
          alt="Image 1"
        />
        <img
          src={Image2}
          className="border-2 w-[200px]"
          alt="Image 2"
        />
        <img
          src={Image3}
          className="border-2 w-[200px]"
          alt="Image 2"
        />
        <img
          src={Image3}
          className="border-2 w-[200px]"

          alt="Image 2"
        />
        <img
          src={Image3}
          className="border-2 w-[200px]"
          alt="Image 2"
        />
      
      </div> */}

      {/* mobile footer */}
      {/* <div className="md:hidden">
        <Footer2 />
      </div> */}
      {/* desktop footer */}
      <div className=" md:inline">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
