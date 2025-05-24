import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import { useAuth } from '../Authentication/AuthContext';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";
import { Base_url } from '../ApiController/ApiController';
import Pagination from '../Pagination/Pagination';
import bookError from '../../assets/bookError.png'

const ProductGrid = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartItemPayload, setCartItemPayload] = useState([]); // Changed from {} to [] 
  const [categoryCount, setCategoryCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  // Fetch cart data with pagination
  const fetchCartData = async () => {
    if (!authToken) {
      console.warn("Auth Token is missing!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${Base_url}getCart?page=${currentPage}&pagination=true`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (!response.ok) throw new Error("Failed to fetch cart data");

      const data = await response.json();
      setCartItems(data.data);
      setCategoryCount(data.category_count);
      setTotalBooks(data.pagination.total);
      setTotalPages(data.pagination?.last_page ?? 1);
      setTotalPrice(data.total_price);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data without pagination to build the order payload
  const fetchCartWithoutPage = async () => {
    if (!authToken) {
      console.warn("Auth Token is missing!");
      return;
    }

    try {
      const response = await fetch(
        `${Base_url}getCart?page=${currentPage}`, // no pagination parameter means full results
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (!response.ok) throw new Error("Failed to fetch cart data");

      const data = await response.json();
      setCartItemPayload(data.data);
    } catch (error) {
      console.error("Error fetching cart data (full):", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [authToken, currentPage]);

  // Fetch payload only once or when authToken changes.
  useEffect(() => {
    fetchCartWithoutPage();
  }, [authToken]);

  // Calculate total price (if needed locally)
  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Handle quantity change for a product
  const handleQuantityChange = async (productId, change) => {
    // Update quantity in paginated cartItems
    const currentItem = cartItems.find((item) => item.id === productId);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + change;
    const unitPrice = currentItem.price / currentItem.quantity;

    if (newQuantity > currentItem.stocks) {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        text: `Only ${currentItem.stocks} available in stock!`,
      });
      return;
    }

    // Update cartItems state (paginated view)
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, newQuantity), price: unitPrice * newQuantity }
        : item
    );
    setCartItems(updatedCartItems);

    // Also update cartItemPayload state (full cart)
    const updatedPayload = cartItemPayload.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, newQuantity), price: unitPrice * newQuantity }
        : item
    );
    setCartItemPayload(updatedPayload);

    try {
      const response = await fetch(`${Base_url}updateCart/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: updatedCartItems.find((item) => item.id === productId).quantity,
          items: updatedCartItems,
        }),
      });
      const data = await response.json();
      console.log(data.status);
      if (data.status === true) {
        fetchCartData();
        fetchCartWithoutPage();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Handle checkout using the full payload (cartItemPayload) instead of paginated cartItems
  const handleCheckout = async () => {
    if (cartItemPayload.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderPayload = {
      total_price: parseFloat(totalPrice).toFixed(2),
      items: cartItemPayload.map((product) => ({
        book_id: product.book_id, // Using correct book_id
        quantity: product.quantity,
      })),
    };

    // console.log("Checkout Payload:", JSON.stringify(orderPayload, null, 2));
    
 
    try {
      const response = await fetch(`${Base_url}createOrder`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();
      if (data.status) {
        alert("Order placed successfully!");
        setCartItems([]);
      } else {
        alert(`Order failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("An error occurred while placing the order. Please try again.");
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
          const response = await fetch(`${Base_url}cart/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to delete item");
          }
          // Remove the deleted item from both arrays
          setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
          setCartItemPayload((prevItems) => prevItems.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error!", "Failed to delete the item. Please try again.", "error");
        }
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-32 h-32 md:w-48 md:h-48 mb-4"
          />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
            Your cart is empty!
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
      <div className="p-4 bg-gray-50">
        <div className="p-6 bg-gray-100 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Books: {totalBooks}</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(categoryCount).map(([category, count]) => (
              <div
                key={category}
                className="bg-[#282828] text-white py-2 px-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="font-bold">{category}:</span> {count} books
              </div>
            ))}
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-2">
  {cartItems.map((product) => (
    <div
      key={product.id}
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-3 flex flex-col items-center hover:shadow-xl transition-transform transform hover:scale-[1.03] relative"
    >
      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
        onClick={() => handleDelete(product.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-11-4h-2a2 2 0 00-2 2v0a2 2 0 002 2h2a2 2 0 002-2v0a2 2 0 00-2-2z"
          />
        </svg>
      </button>

      {/* Image */}
      {/* <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-gray-100">
        <img
          src={product.image || bookError}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div> */}
       <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={product.image || bookError}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                </div>

      {/* Title */}
      <h2 className="mt-2 text-sm font-semibold text-center text-gray-800 line-clamp-2">
        {product.title.length > 40 ? product.title.substring(0, 50) + '...' : product.title}
      </h2>

      {/* Author */}
      <p className="text-xs text-gray-500 text-center mb-1">{product.authors}</p>

      {/* Price */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="text-base font-bold text-green-600">₹{parseFloat(product.price).toFixed(2)}</span>
        <span className="text-xs line-through text-gray-400">₹{parseFloat(product.msrp).toFixed(2)}</span>
      </div>

      {/* Stock Info */}
      <div className="mt-1">
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

      {/* Quantity Controls */}
      <div className="flex items-center mt-3 bg-gray-100 rounded-full overflow-hidden">
        <button
          onClick={() => handleQuantityChange(product.id, -1)}
          className="px-3 py-1 bg-red-500 text-white text-sm hover:bg-red-600 disabled:opacity-40"
          disabled={product.quantity === 1}
        >
          −
        </button>
        <span className="px-4 py-1 text-sm font-medium text-gray-800">{product.quantity}</span>
        <button
          onClick={() => handleQuantityChange(product.id, 1)}
          className="px-3 py-1 bg-green-500 text-white text-sm hover:bg-green-600 disabled:opacity-40"
          disabled={product.quantity === product.stocks}
        >
          +
        </button>
      </div>
    </div>
  ))}
</div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            goToPage={handlePageChange}
          />
        </div>
        <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-700">₹{parseFloat(totalPrice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b mt-2">
            <span className="text-gray-700">Total</span>
            <span className="text-gray-700">₹{parseFloat(totalPrice).toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout} 
            className="mt-4 w-full bg-black text-white py-2 rounded-md transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer className="mt-auto" />
    </>
  );
};

export default ProductGrid;
