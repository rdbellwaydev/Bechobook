
// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import Header from '../Header/Header';
// import Nav from '../Header/Nav';
// import Footer from '../Footer/Footer';

// const ProductGrid = () => {
//   const subtotal = 2000;
//   const total = 2200;
//   const [products] = useState([
//     {
//       id: 1,
//       name: 'Deep Work',
//       author: 'Cal Newport',
//       price: 327,
//       originalPrice: 399,
//       discount: '18% OFF',
//       category: 'Self-Help',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 2,
//       name: 'Atomic Habits: Tiny Changes',
//       author: 'James Clear',
//       price: 449,
//       originalPrice: 499,
//       discount: '10% OFF',
//       category: 'Self-Help',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 3,
//       name: 'The Subtle Art of Not Giving a F*ck',
//       author: 'Mark Manson',
//       price: 299,
//       originalPrice: 350,
//       discount: '15% OFF',
//       category: 'Self-Help',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 4,
//       name: 'Think Like a Monk',
//       author: 'Jay Shetty',
//       price: 350,
//       originalPrice: 399,
//       discount: '12% OFF',
//       category: 'Spirituality',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 5,
//       name: 'The 5 AM Club: Own Your Morning',
//       author: 'Robin Sharma',
//       price: 399,
//       originalPrice: 499,
//       discount: '20% OFF',
//       category: 'Motivational',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 6,
//       name: 'The 5 AM Club: Own Your Morning',
//       author: 'Robin Sharma',
//       price: 399,
//       originalPrice: 499,
//       discount: '20% OFF',
//       category: 'Motivational',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 7,
//       name: 'The 5 AM Club: Own Your Morning',
//       author: 'Robin Sharma',
//       price: 399,
//       originalPrice: 499,
//       discount: '20% OFF',
//       category: 'Motivational',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 8,
//       name: 'The 5 AM Club: Own Your Morning',
//       author: 'Robin Sharma',
//       price: 399,
//       originalPrice: 499,
//       discount: '20% OFF',
//       category: 'Motivational',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//     {
//       id: 9,
//       name: 'The 5 AM Club: Own Your Morning',
//       author: 'Robin Sharma',
//       price: 399,
//       originalPrice: 499,
//       discount: '20% OFF',
//       category: 'Motivational',
//       image: 'https://i.pinimg.com/736x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg',
//     },
//   ]);

//   // Calculate total books
//   const totalBooks = products.length;

//   // Calculate category-wise totals
//   const categoryCounts = products.reduce((acc, product) => {
//     acc[product.category] = (acc[product.category] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="p-4 bg-gray-50 flex-grow">
//         {/* <h1 className="text-3xl font-bold mb-4">My Cart</h1> */}
//         <div className="p-6 bg-gray-100 mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Books: {totalBooks}</h2>
//           <div className="flex flex-wrap gap-4">
//             {Object.entries(categoryCounts).map(([category, count]) => (
//               <div
//                 key={category}
//                 className="bg-[#282828] text-white py-2 px-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <span className="font-bold">{category}:</span> {count} books
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 w-48"
//             >
//               <button
//                 className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
//                 onClick={() => { /* Add your delete function here */ }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-red-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-11-4h-2a2 2 0 00-2 2v0a2 2 0 002 2h2a2 2 0 002-2v0a2 2 0 00-2-2z"
//                   />
//                 </svg>
//               </button>
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover mb-2 rounded"
//               />
//               <h2 className="text-lg font-semibold text-gray-800 text-center mb-1">
//                 {product.name}
//               </h2>
//               <p className="text-sm text-gray-600 text-center mb-1">
//                 {product.author}
//               </p>
//               <div className="flex items-center justify-center mt-1">
//                 <span className="text-lg font-bold text-green-600">₹{product.price}</span>
//                 <span className="text-sm text-gray-500 line-through ml-2">
//                   ₹{product.originalPrice}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-6"> 
//           <div className="flex justify-between py-2 border-b"> <span className="text-gray-700">Subtotal</span> <span className="text-gray-700">₹{subtotal}</span> </div> 
//           <div className="flex justify-between py-2 border-b mt-2"> <span className="text-gray-700">Total</span> <span className="text-gray-700">₹{total}</span> </div> 
//           <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300"> Proceed to Checkout </button> </div>

//       </div>

//       <Footer className="mt-auto" />
//     </>
//   );
// };

// export default ProductGrid;
// import React, { useState, useEffect } from 'react';
// import 'tailwindcss/tailwind.css';
// import Header from '../Header/Header';
// import Nav from '../Header/Nav';
// import Footer from '../Footer/Footer';
// import { useAuth } from '../Authentication/AuthContext';

// const ProductGrid = () => {
//   const { authToken } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await fetch('https://bb.bechobookscan.com/api/getCart', {
//           headers: {
//             'Authorization': `Bearer ${authToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch cart data');
//         }

//         const data = await response.json();
//         setCartItems(data.data);
//         setTotalPrice(data.total_price);
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (authToken) {
//       fetchCartData();
//     }
//   }, [authToken]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Calculate total books
//   const totalBooks = cartItems.length;

//   // Calculate category-wise totals
//   const categoryCounts = cartItems.reduce((acc, product) => {
//     acc[product.category] = (acc[product.category] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="p-4 bg-gray-50 flex-grow">
//         <div className="p-6 bg-gray-100 mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Books: {totalBooks}</h2>
//           <div className="flex flex-wrap gap-4">
//             {Object.entries(categoryCounts).map(([category, count]) => (
//               <div
//                 key={category}
//                 className="bg-[#282828] text-white py-2 px-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <span className="font-bold">{category}:</span> {count} books
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//           {cartItems.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 w-48"
//             >
//               <button
//                 className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
//                 onClick={() => { /* Add your delete function here */ }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-red-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-11-4h-2a2 2 0 00-2 2v0a2 2 0 002 2h2a2 2 0 002-2v0a2 2 0 00-2-2z"
//                   />
//                 </svg>
//               </button>
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-48 object-contain mb-2 rounded"
//               />
//               <h2 className="text-lg font-semibold text-gray-800 text-center mb-1">
//                 {product.title}
//               </h2>
//               <p className="text-sm text-gray-600 text-center mb-1">
//                 {product.authors}
//               </p>
//               <div className="flex items-center justify-center mt-1">
//                 <span className="text-lg font-bold text-green-600">₹{product.price}</span>
//                 <span className="text-sm text-gray-500 line-through ml-2">
//                   ₹{product.msrp}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-6"> 
//           <div className="flex justify-between py-2 border-b"> <span className="text-gray-700">Subtotal</span> <span className="text-gray-700">₹{totalPrice}</span> </div> 
//           <div className="flex justify-between py-2 border-b mt-2"> <span className="text-gray-700">Total</span> <span className="text-gray-700">₹{totalPrice}</span> </div> 
//           <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300"> Proceed to Checkout </button> </div>
//       </div>
//       <Footer className="mt-auto" />
//     </>
//   );
// };

// export default ProductGrid;

// useEffect(() => {
//   const fetchCartData = async () => {
//     if (!authToken) return;

//     setLoading(true); // ✅ Set loading before fetching

//     try {
//       const response = await fetch(
//         `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch cart data");
//       }

//       const data = await response.json();
//       console.log("Cart Data:", data); // ✅ Debugging log

//       // ✅ Ensure valid data before updating state
//       setCartItems(data.data || []);
//       setTotalPrice(data.total_price ?? 0);
//       setTotalPages(data.pagination?.last_page ?? 1);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     } finally {
//       setLoading(false); // ✅ Always stop loading
//     }
//   };

//   fetchCartData();
// }, [authToken, currentPage]); // ✅ Dependency array


// const handleCheckout = async () => { 
//   if (!authToken) {
//     Swal.fire({
//       icon: "warning",
//       title: "Login Required",
//       text: "You must be logged in to place an order!",
//       confirmButtonColor: "#ff7f50",
//     });
//     navigate("/login");
//     return;
//   }

//   setLoading(true);

//   // Map cart items to the required structure
//   const items = cartItems.map((item) => ({
//     book_id: item.id, // Use the correct field for book_id
//     quantity: item.quantity, // Ensure quantity is correct
//   }));

//   // Calculate total price
//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

//   // Log the payload for debugging
//   const payload = {
//     total_price: totalPrice,
//     items: items,
//   };
//   console.log("Request Payload:", payload);

//   try {
//     const response = await fetch("https://bb.bechobookscan.com/api/createOrder", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();
//     console.log("API Response:", data); // Log the response for debugging

//     if (data.status) {
//       Swal.fire({
//         icon: "success",
//         title: "Order Placed!",
//         text: "Your order has been placed successfully. Redirecting to call...",
//         confirmButtonColor: "#28a745",
//       }).then(() => {
//         window.location.href = "tel:+91 79877 89150";
//         navigate("/");
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Order Failed",
//         text: data.message || "Failed to place order. Please try again.",
//         confirmButtonColor: "#dc3545",
//       });
//     }
//   } catch (error) {
//     console.error("Order creation failed:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "Something went wrong. Please try again.",
//       confirmButtonColor: "#dc3545",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

  // Function to update total price dynamically
  // useEffect(() => {
  //   const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //   setTotalPrice(newTotal);
  // }, [cartItems]);


// useEffect(() => {
//   const fetchCartData = async () => {
//     if (!authToken) {
//       console.warn("Auth Token is missing!");
//       return;
//     }

//     console.log("Fetching cart data...");

//     setLoading(true); // ✅ Set loading before fetching

//     try {
//       const response = await fetch(
//         `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         }
//       );

//       console.log("API Response Status:", response.status);

//       if (!response.ok) {
//         throw new Error("Failed to fetch cart data");
//       }

//       const data = await response.json();
//       console.log("Cart Data:", data); // ✅ Debugging log

//       // ✅ Ensure valid data before updating state
//       setCartItems(data.data || []);
//       setTotalPrice(data.total_price ?? 0);
//       setTotalPages(data.pagination?.last_page ?? 1);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     } finally {
//       setLoading(false); // ✅ Always stop loading
//     }
//   };

//   fetchCartData();
// }, [authToken, currentPage]); // ✅ Dependency array
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import { useAuth } from '../Authentication/AuthContext';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";
const ProductGrid = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [updatedCart, setUpdatedCart] = useState({});

// useEffect(() => {
//   const fetchCartData = async () => {
//     if (!authToken) {
//       console.warn("Auth Token is missing!");
//       return;
//     }

//     console.log("Fetching cart data...");

//     setLoading(true); 

//     try {
//       const response = await fetch(
//         `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         }
//       );

//       console.log("API Response Status:", response.status);

//       if (!response.ok) {
//         throw new Error("Failed to fetch cart data");
//       }

//       const data = await response.json();
//       console.log("Cart Data:", data); // ✅ Debugging log

//       // ✅ Ensure valid data before updating state
//       setCartItems(data.data || []);
//       setTotalPages(data.pagination?.last_page ?? 1);
//       if (data.total_price !== undefined) {
//         setTotalPrice(data.total_price);
//       } else {

//         calculateTotalPrice();
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     } finally {
//       setLoading(false); // ✅ Always stop loading
//     }
//   };

//   fetchCartData();
// }, [authToken, currentPage]); // ✅ Dependency array
// useEffect(() => {
//   const fetchCartData = async () => {
//     if (!authToken) {
//       console.warn("Auth Token is missing!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );

//       if (!response.ok) throw new Error("Failed to fetch cart data");

//       const data = await response.json();

//       // Merge local updates with API data
//       const mergedCart = data.data.map((item) => ({
//         ...item,
//         quantity: updatedCart[item.id] ?? item.quantity, 
//       }));

//       setCartItems(mergedCart);
//       setTotalPages(data.pagination?.last_page ?? 1);

//       if (data.total_price !== undefined) {
//         setTotalPrice(data.total_price);
//       } else {
//         calculateTotalPrice();
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCartData();
// }, [authToken, currentPage, updatedCart]); 

// const calculateTotalPrice = async () => {
//   try {
//     const response = await fetch(`https://bb.bechobookscan.com/api/getCart`, {
//       headers: { Authorization: `Bearer ${authToken}` },
//     });
//     if (!response.ok) throw new Error("Failed to fetch full cart");

//     const fullCartData = await response.json();
//     const total = fullCartData.data.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   } catch (error) {
//     console.error("Error calculating total price:", error);
//   }
// };

useEffect(() => {
  const fetchCartData = async () => {
    if (!authToken) {
      console.warn("Auth Token is missing!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (!response.ok) throw new Error("Failed to fetch cart data");

      const data = await response.json();
      setCartItems(data.data);
      setTotalPages(data.pagination?.last_page ?? 1);
      setTotalPrice(data.total_price ?? calculateTotalPrice(data.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCartData();
}, [authToken, currentPage]);

const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const handleQuantityChange = async (productId, change) => {
  const updatedCartItems = cartItems.map((item) => {
    if (item.id === productId) {
      const newQuantity = item.quantity + change;
      if (newQuantity > item.stocks) {
        Swal.fire({
          icon: "warning",
          title: "Stock Limit Reached",
          text: `Only ${item.stocks} available in stock!`,
        });
        return item;
      }
      return { ...item, quantity: Math.max(1, newQuantity) };
    }
    return item;
  });

  setCartItems(updatedCartItems);
  setTotalPrice(calculateTotalPrice(updatedCartItems));

  try {
    await fetch(`https://bb.bechobookscan.com/api/updateCart/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: updatedCartItems.find((item) => item.id === productId).quantity }),
    });
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

const handleCheckout = async () => {
  if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
  }

  const orderPayload = {
      total_price: parseFloat(totalPrice).toFixed(2),
      items: cartItems.map((product) => ({
          book_id: product.book_id,  // ✅ Using correct book_id
          quantity: product.quantity,
      })),
  };

  console.log("Checkout Payload:", JSON.stringify(orderPayload, null, 2)); // Debugging log

  try {
      const response = await fetch("https://bb.bechobookscan.com/api/createOrder", {
          method: "POST",
          headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                  },
          body: JSON.stringify(orderPayload),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      if (data.status) {
          alert("Order placed successfully!");
          // Optionally, clear the cart after successful order
          setCartItems([]);
      } else {
          alert(`Order failed: ${data.message}`);
      }
  } catch (error) {
      console.error("Checkout Error:", error);
      alert("An error occurred while placing the order. Please try again.");
  }
};

// const handleQuantityChange = (productId, change) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === productId) {
//           const newQuantity = item.quantity + change;
//           if (newQuantity > item.stocks) {
//             Swal.fire({
//               icon: "warning",
//               title: "Stock Limit Reached",
//               text: `Only ${item.stocks} available in stock!`,
//             });
//             return item;
//           }
//           return { ...item, quantity: Math.max(1, newQuantity) };
//         }
//         return item;
//       })
//     );
//   };
// const handleQuantityChange = (productId, change) => {
//   setCartItems((prevItems) =>
//     prevItems.map((item) => {
//       if (item.id === productId) {
//         const newQuantity = item.quantity + change;
//         if (newQuantity > item.stocks) {
//           Swal.fire({
//             icon: "warning",
//             title: "Stock Limit Reached",
//             text: `Only ${item.stocks} available in stock!`,
//           });
//           return item;
//         }
//         return { ...item, quantity: Math.max(1, newQuantity) };
//       }
//       return item;
//     })
//   );

//   setTotalPrice((prevTotalPrice) => {
//     const item = cartItems.find((item) => item.id === productId);
//     if (item) {
//       const priceChange = item.price * change;
//       return prevTotalPrice + priceChange;
//     }
//     return prevTotalPrice;
//   });
// };
// const handleQuantityChange = async (productId, change) => {
//   setCartItems((prevItems) =>
//     prevItems.map((item) => {
//       if (item.id === productId) {
//         const newQuantity = item.quantity + change;
//         if (newQuantity > item.stocks) {
//           Swal.fire({
//             icon: "warning",
//             title: "Stock Limit Reached",
//             text: `Only ${item.stocks} available in stock!`,
//           });
//           return item;
//         }
//         return { ...item, quantity: Math.max(1, newQuantity) };
//       }
//       return item;
//     })
//   );

//   try {
//     const itemToUpdate = cartItems.find((item) => item.id === productId);
//     if (!itemToUpdate) return;

//     const response = await fetch(
//       `https://bb.bechobookscan.com/api/updateCart/${productId}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: itemToUpdate.quantity + change }),
//       }
//     );

//     if (!response.ok) throw new Error("Failed to update cart");

//     const updatedData = await response.json();
//     if (updatedData.status) {
//       // Successfully updated, update total price
//       setTotalPrice((prevTotal) => prevTotal + itemToUpdate.price * change);
//     } else {
//       Swal.fire("Error!", updatedData.message, "error");
//     }
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     Swal.fire("Error!", "Failed to update the cart. Please try again.", "error");
//   }
// };


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
          const response = await fetch(`https://bb.bechobookscan.com/api/cart/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to delete item");
          }

          // Remove the deleted item from the cartItems state
          setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

          // Show success message
          Swal.fire("Deleted!", "Your item has been deleted.", "success").then(() => {
            window.location.reload(); // Reloads the page
          });
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
  // Calculate total books
  const totalBooks = cartItems.length;

  
  const categoryCounts = cartItems.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" // New cart-related image
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
            {Object.entries(categoryCounts).map(([category, count]) => (
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 px-1">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 w-36 sm:w-48"
            >
              <button
                className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
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
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-2 rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 text-center mb-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-1">
                {product.authors}
              </p>
              <div className="flex items-center justify-center mt-1">
                {/* <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                <span className="text-sm text-orange-400 line-through ml-2">
                  ₹{product.msrp}
                </span> */}
                <span className="text-lg font-bold text-green-600">
              ₹{(product.price * product.quantity).toFixed(2)}
            </span>
            <span className="text-sm text-orange-400 line-through">
              ₹{(product.msrp * product.quantity).toFixed(2)}
            </span>
              </div>
              <div className="flex items-center mt-2 bg-gray-100 rounded-full px-2 py-1 shadow">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="px-3 py-1 bg-red-500 text-white rounded-l-full hover:bg-red-600 disabled:opacity-50"
                  disabled={product.quantity === 1}
                >
                  -
                </button>
                <span className="px-4 py-1 text-gray-800 font-semibold">{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="px-3 py-1 bg-green-500 text-white rounded-r-full hover:bg-green-600 disabled:opacity-50"
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
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-700">Subtotal</span>
            {/* <span className="text-gray-700">₹{totalPrice}</span> */}
            <span className="text-gray-700">₹{parseFloat(totalPrice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b mt-2">
            <span className="text-gray-700">Total</span>
            {/* <span className="text-gray-700">₹{totalPrice}</span> */}
            <span className="text-gray-700">₹{parseFloat(totalPrice).toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer className="mt-auto" />
    </>
  );
};

export default ProductGrid;