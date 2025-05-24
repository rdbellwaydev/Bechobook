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
import axios from "axios";
const InnerBooks = () => {
  const { id } = useParams(); // Get dynamic ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16); // Initially show 10 products
  const [quantity, setQuantity] = useState(1);
  const [IsInCart, setIsInCart] = useState(false);
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
  const fetchBookDetails = async () => {
    try {
      const userId = localStorage.getItem('user_id') || '';
      const response = await axios.get(`${Base_url}getBookById/${id}?user_id=${userId}`);
      if (response.data.status && response.data.data) {
        setProduct(response.data.data);
        setIsInCart(response.data.data.is_in_cart);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
    if (id) {
      fetchBookDetails();
    }
  }, [id]); // Runs whenever the ID or authToken changes

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const userId = localStorage.getItem('user_id') || '';
        const response = await fetch(`${Base_url}getSimilarBooks?book_id=${id}&user_id=${userId}`);
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
        fetchBookDetails();
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
              <div className="mt-2">
               
               {parseInt(product.stocks) > 0 ? (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                   <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   In Stock ({product.stocks} available)
                 </span>
               ) : (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                   <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                   </svg>
                   Out of Stock
                 </span>
               )}
             </div>
              <div className="flex space-x-4">
              <button
  onClick={() => handleAddToCart(product)}
  disabled={IsInCart}
  className={`flex items-center px-4 py-2 border 
    ${IsInCart 
      ? 'border-yellow-500 text-white bg-yellow-500 cursor-not-allowed' 
      : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'} 
    font-semibold rounded-lg transition-colors mt-4`}
>
  🛒 {IsInCart ? 'Added to Cart' : 'Add to Cart'}
</button>

                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-4"
                >
                  ❤️ Add to Wishlist
                </button>
              </div>

              <h2 className="text-xl font-semibold mt-6 ">Description</h2>
              <p className="text-gray-700 mt-2 pr-4">
                <span className="hidden sm:inline">{cleanSynopsis || "No description available."}</span>

                <span className="sm:hidden">
                  {showFullDescription ? cleanSynopsis : shortDescription || "No description available."}
                </span>
              </p>

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
              <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={product.book.image}
                  alt={product.book.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                </div>

              {/* Product Details */}
              <div className="mt-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 line-clamp-2">
                  {product.book.title}
                </h3>
                <p className="text-gray-500 text-xs">
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
           
              <div className="flex justify-end items-center mt-2">
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
      <div className="md:inline">
        <Footer />
      </div>
    </>
  );
};

export default InnerBooks;
