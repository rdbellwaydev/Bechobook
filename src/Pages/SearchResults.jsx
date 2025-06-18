import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Base_url } from '../components/ApiController/ApiController';
import { HashLoader } from 'react-spinners';
import NoResults from '../assets/no_result.jpg'
import { useAuth } from '../components/Authentication/AuthContext';
import { useCart } from '../components/CartContext';
import Swal from 'sweetalert2';
export default function SearchResults() {
     const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authToken } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const scrollPositionRef = useRef(0)
  // Simulate fetching results
      // Replace this with actual API call
      const fetchResults = async () => {
        try {
          const userId = localStorage.getItem("user_id");
          const response = await fetch(`${Base_url}SearchBooks?search=${query}&user_id=${userId || ''}`);
          const data = await response.json();
          setResults(data.data.books || []);
        } catch (err) {
          console.error("Search error:", err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {
    if (!query) return;

    setLoading(true);



    fetchResults();
  }, [query]);

  const handleResultClick = (book) => {
    
    navigate(`/book/${book.isbn13}`);
  };

  const handleAddToCart = async (book) => {
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

    const isProductInCart = cartItems.some((item) => item.book_id === book.id);
    if (isProductInCart) {
      Swal.fire({
        icon: "warning",
        title: "Already in Cart",
        text: "This book is already in your cart!",
      });
      return;
    }

    try {
      const response = await fetch(Base_url + "addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ book_id: book.id }),
      });

      const data = await response.json();

      if (data.status) {
        scrollPositionRef.current = window.scrollY; // Save current scroll
    
        fetchResults();
        setCartItems((prevItems) => [
          ...prevItems,
          { ...book, book_id: book.id },
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
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }
  return (
    <div className="p-4 max-w-4xl mx-auto">
    <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>

    {loading ? (
      <p>Loading...</p>
    ) : results.length === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
      <img
        src={NoResults}
        alt="No Results"
        className="w-70 h-auto object-contain"
      />
      <p className="text-gray-500 mt-4">No results found</p>
    </div>
    ) : (
      <>
      {/* <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((book, index) => (
          <li
            key={index}
            className="border rounded p-3 shadow hover:shadow-md transition cursor-pointer"
            onClick={() => handleResultClick(book)}
          >
          
                <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
  <img
    src={book.image || 'https://via.placeholder.com/150'}
    alt={book.title || 'Book'}
    className="w-full h-full object-cover"
     loading="lazy"
  />
</div>
            <h2 className="text-lg font-semibold">{book.title.length > 40 ? book.title.substring(0,50)+'...' : book.title}</h2>
            <p className="text-sm text-gray-600">{book.authors}</p>
          </li>
        ))}
      </ul> */}
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {results.map((book,index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/product/${book.id}`)}
                    className="border p-4 rounded-lg shadow-md"
                  >
                   <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={book.image || 'https://via.placeholder.com/150'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                </div>
                    <h2 className="font-semibold truncate">
                      {book.title || "No Title"}
                    </h2>
                    {/* <span className="text-lg font-bold">₹{book.price}</span> */}
                    <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-black max-sm:text-base"> {/* Smaller text on mobile */}
                      ₹{book.price}
                    </span>
                    <span className="text-orange-400 line-through text-sm max-sm:text-xs"> {/* Smaller text on mobile */}
                      ₹{book.mrp}
                    </span>
                  </div>
                  {book.discount && book.discount !== "null% OFF" ? (
                    <div className="flex items-center justify-between mt-1">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full max-sm:text-[10px]"> {/* Smaller text on mobile */}
                        {book.discount.replace("null% OFF", "").trim()}% OFF
                      </span>
                    </div>
                  ) : null}
                    <div className="flex justify-end items-center mt-2">
                    <button
                    disabled={book.is_in_cart}
  className={`p-2 rounded-full shadow-md border 
    ${book.is_in_cart ? 'border-yellow-500 text-white bg-yellow-500 cursor-not-allowed' 
                          : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"}`}
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCart(book);
  }}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
    alt="Add to Cart"
    className="w-5 h-5"
    // style={book.is_in_cart ? { filter: "invert(1)" } : {}}
  />
</button>

                    </div>
                  </div>
                ))}
              </div>
        </>
    )}
  </div>
  )
}
