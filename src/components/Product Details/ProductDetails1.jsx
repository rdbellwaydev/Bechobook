// import React from "react";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Footer/Footer";
// import Footer2 from "../Footer/Footer2";
// const ProductDetails1 = () => {
//   const navigate = useNavigate();

//   const handleAddToCart = () => {
//     // Perform any add-to-cart logic here, like API calls or updating local state
//     navigate('/cart'); // Navigate to the cart page
//   };
//   const handleAddToWishlist = () => {
//     navigate('/wishlist');
//   }
//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* <div className="w-full md:w-1/2">
//               <img
//                 src="https://i.pinimg.com/736x/1e/f0/a1/1ef0a1ee7806b8db157bf81ade5fe2a4.jpg"
//                 alt="Looking for Alaska"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div> */}
//             <div className="w-full md:w-1/2 mt-4">
//               <img
//                 src="https://i.pinimg.com/736x/00/97/db/0097db58a440f01f8c01587aa7add1f2.jpg"
//                 alt="Looking for Alaska"
//                 className="w-full h-[400px] object-contain rounded-lg"
//               />
//             </div>

//             <div className="w-full md:w-1/2 mt-4">
//               <h1 className="text-2xl font-bold">Looking For Alaska</h1>
//               <p className="text-gray-600">
//                 Author: <span className="font-medium text-green-600">John Green</span> | Binding:
//                 <span className="font-medium"> Paperback</span>
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-3xl font-bold">₹ 180</span>
//                 <span className="text-gray-500 line-through">₹ 399</span>
//                 <span className="text-black px-2 py-1 rounded-md">
//                   55% OFF
//                 </span>
//                 <span className="text-green-500 font-medium">You save ₹219</span>
//               </div>
//               <div className="flex space-x-4">
//                 <button onClick={handleAddToCart} className="flex items-center px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors mt-4">
//                   <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M6 6h15l1.68 10H7.32L6 6z" />
//                     <circle cx="9" cy="21" r="1" />
//                     <circle cx="20" cy="21" r="1" />
//                   </svg>
//                   Add to Cart
//                 </button>

//                 {/* Add to Wishlist button */}
//                 <button onClick={handleAddToWishlist} className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-4">
//                   <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//                   </svg>
//                   Add to Wishlist
//                 </button>
//               </div>

//               <h2 className="text-xl font-semibold mt-6">Description</h2>
//               <p className="text-gray-700 mt-2">
//                 A gripping tale of love, loss, and the search for meaning,<br /> "Looking for Alaska" is a coming-of-age story that explores the complexities of friendship and the impact of choices.
//               </p>
//               <div className="bg-gray-100 p-6 mt-4">

//                 {/* <h2 className="text-2xl font-bold mb-4">32 Quality Checks</h2> */}

//                 <div className="flex flex-col gap-4">
//                   <div className="flex items-start gap-2">
//                     <span className="text-green-500 text-xl">✓</span>
//                     <p className="text-gray-700">
//                       Spine: <span className="font-medium">The spine is undamaged, however there are noticeable creases.</span>
//                     </p>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <span className="text-green-500 text-xl">✓</span>
//                     <p className="text-gray-700">
//                       Dried up Spine
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="p-4 border-t">

//             <div className="mb-6 text-center">
//               <button className="text-2xl font-bold text-black-500 border-b-2 border-green-500 pb-1 mr-4 ">
//                 Details
//               </button>
//             </div>

//             <div className="flex items-center justify-center">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-100 w-[800px] rounded-lg shadow-lg">
//                 <ul className="space-y-4">
//                   <li className="flex items-center justify-center">
//                     <span className="text-blue-500 text-xl mr-3">
//                       📚
//                     </span>
//                     <div>
//                       <span className="block font-semibold text-gray-700">Author</span>
//                       <span className="text-gray-600">Name</span>
//                     </div>
//                   </li>

//                   <li className="flex items-center justify-center">
//                     <span className="text-purple-500 text-xl mr-3">
//                       🏢
//                     </span>
//                     <div>
//                       <span className="block font-semibold text-gray-700">Publisher</span>
//                       <span className="text-gray-600">Name</span>
//                     </div>
//                   </li>

//                   <li className="flex items-center justify-center">
//                     <span className="text-green-500 text-xl mr-3 ml-12">
//                       📅
//                     </span>
//                     <div>
//                       <span className="block font-semibold text-gray-700 ">Publishing Year</span>
//                       <span className="text-gray-600">234</span>
//                     </div>
//                   </li>
//                 </ul>

//                 <ul className="space-y-4">
//                   <li className="flex items-center justify-center">
//                     <span className="text-red-500 text-xl mr-3">
//                       🌐
//                     </span>
//                     <div>
//                       <span className="block font-semibold text-gray-700">Language</span>
//                       <span className="text-gray-600">hefbdkf</span>
//                     </div>
//                   </li>

//                   <li className="flex items-center justify-center">
//                     <span className="text-yellow-500 text-xl mr-3">
//                       🔖
//                     </span>
//                     <div>
//                       <span className="block font-semibold text-gray-700">ISBN</span>
//                       <span className="text-gray-600">232343</span>
//                     </div>
//                   </li>

//                   <li className="flex items-center justify-center">
//                     <span className="text-indigo-500 text-xl mr-3">
//                       🛠️
//                     </span>
//                     <div>
//                       <span className="block font-semibold text-gray-700">Condition</span>
//                       <span className="text-gray-600">dnfdn</span>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>


//             <hr className="my-4" />

//           </div>
//         </div>
//       </div>
//       <div className="md:hidden">
//         <Footer2 />
//       </div>
//       {/* desktop footer */}
//       <div className="hidden md:inline">
//         <Footer />
//       </div>


//     </>
//   );
// };

// export default ProductDetails1;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import Footer2 from "../Footer/Footer2";

// const ProductDetails1 = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(`https://bb.bechobookscan.com/api/getBookById/${id}`);
//         const data = await response.json();
//         if (data.status) {
//           setBook(data.data);
//         } else {
//           console.error("Book not found");
//         }
//       } catch (error) {
//         console.error("Error fetching book details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookDetails();
//   }, [id]);

//   const handleAddToCart = () => {
//     navigate('/cart');
//   };

//   const handleAddToWishlist = () => {
//     navigate('/wishlist');
//   };

//   if (loading) {
//     return <div className="text-center text-xl font-bold">Loading...</div>;
//   }

//   if (!book) {
//     return <div className="text-center text-xl font-bold">Book not found</div>;
//   }

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="w-full md:w-1/2 mt-4">
//               <img
//                 src={book.book.image}
//                 alt={book.book.title}
//                 className="w-full h-[400px] object-contain rounded-lg"
//               />
//             </div>

//             <div className="w-full md:w-1/2 mt-4">
//               <h1 className="text-2xl font-bold">{book.book.title}</h1>
//               <p className="text-gray-600">
//                 Author: <span className="font-medium text-green-600">{book.book.authors.join(", ")}</span> | Binding:
//                 <span className="font-medium"> {book.book.binding}</span>
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-3xl font-bold">₹ {book.price}</span>
//                 <span className="text-gray-500 line-through">₹ {book.mrp}</span>
//                 {book.discount && (
//                   <span className="text-black px-2 py-1 rounded-md">
//                     {book.discount}% OFF
//                   </span>
//                 )}
//                 <span className="text-green-500 font-medium">
//                   You save ₹{(book.mrp - book.price).toFixed(2)}
//                 </span>
//               </div>

//               <div className="flex space-x-4">
//                 <button onClick={handleAddToCart} className="flex items-center px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors mt-4">
//                   🛒 Add to Cart
//                 </button>

//                 <button onClick={handleAddToWishlist} className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-4">
//                   ❤️ Add to Wishlist
//                 </button>
//               </div>

//               <h2 className="text-xl font-semibold mt-6">Description</h2>
//               <p className="text-gray-700 mt-2">{book.book.synopsis}</p>

//               <div className="bg-gray-100 p-6 mt-4">
//                 <h2 className="text-2xl font-bold mb-4">Book Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <ul className="space-y-4">
//                     <li><strong>Publisher:</strong> {book.book.publisher}</li>
//                     <li><strong>Language:</strong> {book.book.language}</li>
//                     <li><strong>Pages:</strong> {book.book.pages}</li>
//                   </ul>
//                   <ul className="space-y-4">
//                     <li><strong>ISBN-13:</strong> {book.book.isbn13}</li>
//                     <li><strong>Publishing Year:</strong> {book.book.date_published}</li>
//                     <li><strong>Condition:</strong> {book.condition_id}</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <hr className="my-4" />

//         </div>
//       </div>

//       <div className="md:hidden">
//         <Footer2 />
//       </div>
//       <div className="hidden md:inline">
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ProductDetails1;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import Footer2 from "../Footer/Footer2";
import { useAuth } from "../Authentication/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { useCart } from "../CartContext";
import Swal from "sweetalert2";
import { Base_url } from "../ApiController/ApiController";
import bookError  from '../../assets/bookError.png';
const InnerBooks = () => {
  const { id } = useParams(); // Get dynamic ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16); // Initially show 10 products
  const [quantity, setQuantity] = useState(1);
 
const { cartItems, setCartItems } = useCart();
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1 || newQuantity > product.stocks) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `You cannot select more than ${product.stocks} items.`,
      });
      return;
    }
    setQuantity(newQuantity);
  };
  const handleLoadMore = () => {
    setVisibleCount(relatedProducts.length); // Show all products
  };
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${Base_url}getBookById/${id}`);
        const data = await response.json();
        if (data.status && data.data) {
          setProduct(data.data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchBookDetails();
    }
  }, [id]); // Runs whenever the ID changes

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`${Base_url}getSimilarBooks?book_id=${id}`);
        const data = await response.json();
        if (data.status && data.data) {
          setRelatedProducts(data.data);
        } else {
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (id) {
      fetchRelatedProducts();
    }
  }, [id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }
  const { authToken } = useAuth();

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
  
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.book_id === product.id);
  
    if (isProductInCart) {
      Swal.fire({
        icon: "warning",
        title: "Already in Cart",
        text: "This book is already in your cart!",
      });
      return;
    }
  
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
  const handleAddToWishlist = async (product) => {
    // if (!authToken) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "You are not logged in!",
    //     text: "Please log in to add items to your wishlist.",
    //     confirmButtonText: "Login",
    //   }).then(() => {
    //     navigate("/login"); // Redirect to login page
    //   });
    //   return;
    // }
    if (!authToken) {
      Swal.fire({
        icon: "warning",
        title: "You are not logged in!",
        text: "Please log in to add items to your wishlist.",
        confirmButtonText: "Login",
        showCancelButton: true, // Adds a cancel button
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Navigate only if user clicks "Login"
        }
      });
      return;
    }

    try {
      const response = await fetch(Base_url+"addToWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          book_id: product.id,
        }),
      });

      const data = await response.json();
      if (data.status) {
        alert("Book added to wishlist successfully!");
        navigate("/wishlist");
      } else {
        alert("Book already added in the wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  // const handleAddToWishlist = () => navigate("/wishlist");

  if (loading) {
    return <div className="text-center p-6">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center p-6 text-red-500">Failed to load product.</div>;
  }

  const book = product.book || {};
  const price = parseFloat(product.price) || 0;
  const mrp = parseFloat(product.mrp) || 0;
  const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : null;
  const cleanSynopsis = book.synopsis ? book.synopsis.replace(/<br\s*\/?>/g, "") : "No description available.";
  const shortDescription = cleanSynopsis.slice(0, 70) + "...";
  return (
    <>
      <Header />
      <Nav />
      <div className="bg-gray-100 min-h-screen p-6 ">
        <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 mt-4">
              <img
                src={book.image || "https://via.placeholder.com/400"}
                alt={book.title}
                className="w-full h-[400px] object-contain rounded-lg"

              />
            </div>

            <div className="w-full md:w-1/2 mt-4 md:h-[400px] overflow-y-auto scrollbar-hide" style={{

              scrollbarWidth: 'none', // For Firefox to hide the scrollbar
            }}>
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-gray-600">
                Author: <span className="font-medium text-green-600"> {Array.isArray(book.authors)
        ? book.authors.join(", ")
        : book.authors || "Unknown"}</span> | Binding:
                <span className="font-medium"> {book.binding || "N/A"}</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold">₹ {price.toFixed(2)}</span>
                {mrp > 0 && <span className="text-orange-400 line-through">₹ {mrp.toFixed(2)}</span>}
                {discount && <span className="text-red-500 px-2 py-1 rounded-md">{discount}% OFF</span>}
              </div>
              {/* <div className="mt-4">
                <h3 className="text-xl font-semibold mb-4">Quantity</h3>
                <div className="flex items-center justify-start gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-orange-500 hover:text-white font-bold bg-white  border border-red-500 transition-all rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm text-orange-500 font-bold bg-white border border-orange-500 rounded-md shadow-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-white hover:bg-orange-500 hover:text-white border border-red-500 transition-all rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity === product.stocks}
                  >
                    +
                  </button>

                </div>
                <p className="text-gray-500 text-sm mt-2 text-left">
                  ({product.stocks} available)
                </p>
              </div> */}

              <div className="flex space-x-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors mt-4"
                >
                  🛒 Add to Cart
                </button>
                <button
                  // onClick={handleAddToWishlist}
                  onClick={() => handleAddToWishlist(product)}
                  className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-4"
                >
                  ❤️ Add to Wishlist
                </button>
              </div>

              <h2 className="text-xl font-semibold mt-6 ">Description</h2>
              {/* <p className="text-gray-700 mt-2 pr-4">
                {book.synopsis ? book.synopsis.replace(/<br\s*\/?>/g, '') : "No description available."}
              </p> */}
              <p className="text-gray-700 mt-2 pr-4">
                {/* Show full description on larger screens */}
                <span className="hidden sm:inline">{cleanSynopsis || "No description available."}</span>

                {/* Show truncated description on mobile with Read More */}
                <span className="sm:hidden">
                  {showFullDescription ? cleanSynopsis : shortDescription || "No description available."}
                </span>
              </p>

              {/* Show Read More only if description exists and is meaningful */}
              {cleanSynopsis && cleanSynopsis.trim() !== "" && cleanSynopsis !== "No description available." &&
                !showFullDescription && shortDescription.trim() !== "" && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="text-blue-500 sm:hidden mt-2 underline"
                  >
                    Read More
                  </button>
                )}

            </div>
          </div>

          <br />
          <div className="p-4 border-t">
            <div className="mb-6 text-center">
              <button className="text-2xl font-bold text-black-500 border-b-2 border-green-500 pb-1 mr-4">
                Details
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-100 w-[800px] rounded-lg shadow-lg">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    📚 <span className="ml-2 font-semibold">Author:</span> <span className="ml-2"> {Array.isArray(book.authors)
        ? book.authors.join(", ")
        : book.authors || "Unknown"}</span>
                  </li>
                  <li className="flex items-center">
                    🏢 <span className="ml-2 font-semibold">Publisher:</span> <span className="ml-2">{book.publisher || "Unknown"}</span>
                  </li>
                  <li className="flex items-center">
                    📅 <span className="ml-2 font-semibold">No. of Pages:</span> <span className="ml-2">{book.pages || "Unknown"}</span>
                  </li>
                </ul>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    🌐 <span className="ml-2 font-semibold">Language:</span> <span className="ml-2">{book.language || "Unknown"}</span>
                  </li>
                  <li className="flex items-center">
                    🔖 <span className="ml-2 font-semibold">ISBN13:</span> <span className="ml-2">{book.isbn13 || book.isbn || "Unknown"}</span>
                  </li>
                  <li className="flex items-center">
                    🛠️ <span className="ml-2 font-semibold">Condition:</span> <span className="ml-2">{product.condition_name}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-semibold text-center mb-2">Related Products</h2>
        <div className="border-t-2 border-green-500 w-20 mx-auto mb-6"></div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              onClick={() => {
                navigate(`/product/${product.id}`); // Navigate to the new product page
                window.location.reload(); // Force page reload
              }}
              className="bg-white shadow-md rounded-lg p-3 h-full flex flex-col justify-between"
            >
              {/* Image */}
              <div className="w-full">
                <img
                  src={product.book.image || bookError}
                  alt={product.book.title}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="mt-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 line-clamp-2">
                  {product.book.title}
                </h3>
                <p className="text-gray-500 text-xs">
                  {/* {product.book.authors?.join(", ") || "Unknown"} */}
                  {Array.isArray(book.authors)
        ? book.authors.join(", ")
        : book.authors || "Unknown"}
                </p>
              </div>

              {/* Pricing Section */}
              <div className="mt-2">
                <span className="text-lg font-bold text-gray-900">₹ {product.price}</span>
                {product.mrp && (
                  <span className="text-sm line-through text-orange-400 ml-2">
                    ₹ {product.mrp}
                  </span>
                )}
              </div>

              {/* Discount Badge Below Price */}
              {product.discount && (
                <span className="mt-1 text-xs sm:text-sm text-white bg-red-500 px-2 py-1 rounded-full w-fit">
                  {product.discount}% OFF
                </span>
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

        {/* Load More Button */}
        {visibleCount < relatedProducts.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition m-10"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      {/* <div className="md:hidden">
        <Footer2 />
      </div> */}
      <div className="md:inline">
        <Footer />
      </div>
    </>
  );
};

export default InnerBooks;
