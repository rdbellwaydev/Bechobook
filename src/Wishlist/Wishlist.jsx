// import React from "react";
// import Header from "../components/Header/Header";
// import Nav from "../components/Header/Nav";
// import Footer from "../components/Footer/Footer";
// const products = [
//   {
//     id: 1,
//     name: "Libas Women Peach-Colour",
//     image: "https://i.pinimg.com/736x/91/c5/70/91c570163e04db3e30581a99ae93c522.jpg",
//     price: "Rs. 2,879",
//     originalPrice: "Rs. 7,999",
//     discount: "64% OFF",
//   },
//   {
//     id: 2,
//     name: "KALINI Abstract Printed",
//     image: "https://i.pinimg.com/736x/91/c5/70/91c570163e04db3e30581a99ae93c522.jpg",
//     price: "Rs. 2,309",
//     originalPrice: "Rs. 6,999",
//     discount: "67% OFF",
//   },
//   {
//     id: 3,
//     name: "Shae by SASSAFRAS Printed",
//     image: "https://i.pinimg.com/736x/91/c5/70/91c570163e04db3e30581a99ae93c522.jpg",
//     price: "Rs. 1,999",
//     originalPrice: "Rs. 4,999",
//     discount: "60% OFF",
//   },
//   {
//     id: 4,
//     name: "Warthy Ent Black & Silver",
//     image: "https://i.pinimg.com/736x/91/c5/70/91c570163e04db3e30581a99ae93c522.jpg",
//     price: "Rs. 2,277",
//     originalPrice: "Rs. 6,599",
//     discount: "66% OFF",
//   },
//   {
//     id: 5,
//     name: "Warthy Ent Black & Silver",
//     image: "https://i.pinimg.com/736x/91/c5/70/91c570163e04db3e30581a99ae93c522.jpg",
//     price: "Rs. 2,277",
//     originalPrice: "Rs. 6,599",
//     discount: "66% OFF",
//   },
// ];

// const ProductPage = () => {
//   return (
//     <>
//     <Header/>
//     <Nav/>
//     <div className="p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg shadow-md overflow-hidden relative"
//           >
//             {/* Close Icon */}
//             <button className="absolute top-2 right-2 text-gray-500 bg-white p-1 rounded-full hover:bg-gray-200">
//               ✕
//             </button>

//             {/* Product Image */}
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-60 object-cover"
//             />

//             {/* Product Details */}
//             <div className="p-4">
//               <h3 className="text-sm font-medium text-gray-700 truncate">
//                 {product.name}
//               </h3>
//               <div className="flex items-center space-x-2 mt-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   {product.price}
//                 </span>
//                 <span className="text-sm line-through text-gray-400">
//                   {product.originalPrice}
//                 </span>
//                 <span className="text-sm text-green-600">{product.discount}</span>
//               </div>
//               <button className="mt-4 w-full text-white bg-red-500 py-2 rounded-lg hover:bg-red-600">
//                 Move to Bag
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default ProductPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Nav from "../components/Header/Nav";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../components/Authentication/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { useCart } from "../components/CartContext";
const ProductPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const { cartItems, setCartItems } = useCart();
  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bb.bechobookscan.com/api/getWishlist", // Add page parameter if needed
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       // Ensure the response is successful and contains valid JSON
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch wishlist");
  //       }

  //       const data = await response.json();

  //       if (data.status) {
  //         // Transform API data to match the product structure
  //         const transformedData = data.data.map((item) => ({
  //           id: item.id,
  //           book_id: item.book_id,
  //           name: item.title_long,
  //           image: item.image,
  //           price: ` ${item.price}`,
  //           msrp: item.msrp,
  //           discount: "10% OFF", // Example discount
  //         }));

  //         setWishlist(transformedData);
  //       } else {
  //         setError("Failed to fetch wishlist.");
  //       }
  //     } catch (err) {
  //       setError();
  //       console.error("Error fetching wishlist:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlist();
  // }, [authToken]);
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
            `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
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
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          "https://bb.bechobookscan.com/api/getWishlist", // Add page parameter if needed
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        // Ensure the response is successful and contains valid JSON
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
  
        const data = await response.json();
  
        if (data.status) {
          // Transform API data to match the product structure
          const transformedData = data.data
            .filter((item) => item.active_inactive === 1) // Filter out inactive books
            .map((item) => ({
              id: item.id,
              book_id: item.book_id,
              name: item.title_long,
              image: item.image,
              price: ` ${item.price}`,
              msrp: item.msrp,
              discount: item.discount,
          
            }));
           console.log(transformedData)
          setWishlist(transformedData);
        } else {
          setError("Failed to fetch wishlist.");
        }
      } catch (err) {
        setError();
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWishlist();
  }, [authToken]);
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
  //     console.log("Adding to cart:", product); // Debugging
  
  //     const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       body: JSON.stringify({ book_id: product.book_id }), // Ensure correct field is sent
  //     });
  
  //     const data = await response.json();
  //     console.log("API Response:", data); // Debugging
  
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
  //     console.error("Error adding to cart:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message || "Something went wrong. Please try again.",
  //     });
  //   }
  // };
  

  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
  
    // Disable the button to prevent multiple clicks
    if (isAddingToCart) return;
    setIsAddingToCart(true);
  
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.book_id === product.book_id);
  
    if (isProductInCart) {
      Swal.fire({
        icon: "warning",
        title: "Already in Cart",
        text: "This book is already in your cart!",
      });
      setIsAddingToCart(false); // Re-enable the button
      return;
    }
  
    try {
      console.log("Adding to cart:", product);
  
      const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ book_id: product.book_id }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Book added to cart successfully!",
        }).then(() => {
          // navigate("/cart");
        });
  
        // Update the cartItems state with the new item
        setCartItems((prevItems) => [...prevItems, product]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: data.message || "Failed to add book to cart.",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsAddingToCart(false); // Re-enable the button
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://bb.bechobookscan.com/api/deleteWishlist/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to delete item");
          }

          // Remove the deleted item from the cartItems state
          setWishlist((prevItems) => prevItems.filter((item) => item.id !== id));

          // Show success message
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error!", "Failed to delete the item. Please try again.", "error");
        }
      }
    });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
            alt="Empty Wishlist"
            className="w-32 h-32 md:w-48 md:h-48 mb-4"
          />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
            Your wishlist is empty!
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Nav />
      <div className="p-12">
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
    {wishlist.map((product) => (
      <div
        key={product.id}
        className="border rounded-lg shadow-md overflow-hidden relative p-2"
        onClick={() => navigate(`/product/${product.book_id}`)}
      >
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 text-gray-500 bg-white p-1 rounded-full hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from triggering card click
            handleDelete(product.id);
          }}
        >
          ✕
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-60 max-sm:h-[120px] object-contain"
        />

        {/* Product Details */}
        <div className="p-2 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 truncate">
            {product.name}
          </h3>

          {/* Price Section - Fixed for Mobile */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm sm:text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-xs sm:text-sm line-through text-orange-400">
            ₹{product.msrp}
            </span>
          </div>

          {/* Discount Badge - Styled Like Your Image */}
          <div className="mt-1">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          </div>
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
      </div>
    ))}
  </div>
</div>

      <Footer />
    </>
  );
};

export default ProductPage;