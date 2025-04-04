
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import Footer2 from "../Footer/Footer2";
// import { useAuth } from "../Authentication/AuthContext";
// import HashLoader from "react-spinners/HashLoader";


// const ProductDetails1 = () => {
//   const { id } = useParams(); // Get dynamic ID from the URL
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { isbn13 } = useParams();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://bb.bechobookscan.com/api/getBookByISBN?isbn13=${isbn13}`
//         );
//         const data = await response.json();

//         // if (data.status && data.data) {
//         //   setProduct(data.data);
//         // } else {
//         //   setProduct(null);
//         // }
//         if (data.status && data.data.length > 0) {
//           setProduct(data.data[0]); // Fix: Use the first object
//         } else {
//           setProduct(null);
//         }

//       } catch (error) {
//         console.error("Error fetching book details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isbn13) {
//       fetchBookDetails();
//     }
//   }, [isbn13]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }
//   const { authToken } = useAuth();

//   // const handleAddToCart = () => navigate("/cart");
//   const handleAddToCart = async (product) => {


//     try {
//       const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`, // Include the token in the Authorization header
//         },
//         body: JSON.stringify({
//           book_id: product.id,
//         }),
//       });

//       const data = await response.json();
//       if (data.status) {
//         alert("Book added to cart successfully!");
//         navigate("/cart"); // Navigate to cart page
//       } else {
//         alert("Failed to add book to cart.");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };
//   const handleAddToWishlist = async (product) => {


//     try {
//       const response = await fetch("https://bb.bechobookscan.com/api/addToWishlist", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`, // Include the token in the Authorization header
//         },
//         body: JSON.stringify({
//           book_id: product.id,
//         }),
//       });

//       const data = await response.json();
//       if (data.status) {
//         alert("Book added to wishlist successfully!");
//         navigate("/wishlist");
//       } else {
//         alert("Book already added in the wishlist");
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//     }
//   };
//   // const handleAddToWishlist = () => navigate("/wishlist");

//   if (loading) {
//     return <div className="text-center p-6">Loading product details...</div>;
//   }

//   if (!product) {
//     return <div className="text-center p-6 text-red-500">Failed to load product.</div>;
//   }

//   const book = product.book || {};
//   const price = parseFloat(product.price) || 0;
//   const mrp = parseFloat(product.mrp) || 0;
//   const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : null;

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="w-full md:w-1/2 mt-4">
//               <img
//                 src={book.image || "https://via.placeholder.com/400"}
//                 alt={book.title}
//                 className="w-full h-[400px] object-contain rounded-lg"
//               />
//             </div>

//             <div className="w-full md:w-1/2 mt-4 md:h-[400px] overflow-y-auto scrollbar-hide" style={{

//               scrollbarWidth: 'none', // For Firefox to hide the scrollbar
//             }}>
//               <h1 className="text-2xl font-bold">{book.title}</h1>
//               <p className="text-gray-600">
//                 Author: <span className="font-medium text-green-600">{book.authors?.join(", ") || "Unknown"}</span> | Binding:
//                 <span className="font-medium"> {book.binding || "N/A"}</span>
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-3xl font-bold">₹ {price.toFixed(2)}</span>
//                 {mrp > 0 && <span className="text-green-500 line-through">₹ {mrp.toFixed(2)}</span>}
//                 {discount && <span className="text-black px-2 py-1 rounded-md">{discount}% OFF</span>}
//               </div>
//               <h2 className="text-xl font-semibold mt-6">Description</h2>
//               <p className="text-gray-700 mt-2">
//                 {book.synopsis ? book.synopsis.replace(/<br\s*\/?>/g, '') : "No description available."}
//               </p>
//             </div>
//           </div>

//           <br />
//           <div className="p-4 border-t">
//             <div className="mb-6 text-center">
//               <button className="text-2xl font-bold text-black-500 border-b-2 border-green-500 pb-1 mr-4">
//                 Details
//               </button>
//             </div>

//             <div className="flex items-center justify-center">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-100 w-[800px] rounded-lg shadow-lg">
//                 <ul className="space-y-4">
//                   <li className="flex items-center">
//                     📚 <span className="ml-2 font-semibold">Author:</span> <span className="ml-2">{book.authors?.join(", ") || "Unknown"}</span>
//                   </li>
//                   <li className="flex items-center">
//                     🏢 <span className="ml-2 font-semibold">Publisher:</span> <span className="ml-2">{book.publisher || "Unknown"}</span>
//                   </li>
//                   <li className="flex items-center">
//                     📅 <span className="ml-2 font-semibold">Publishing Year:</span> <span className="ml-2">{book.date_published || "Unknown"}</span>
//                   </li>
//                 </ul>
//                 <ul className="space-y-4">
//                   <li className="flex items-center">
//                     🌐 <span className="ml-2 font-semibold">Language:</span> <span className="ml-2">{book.language || "Unknown"}</span>
//                   </li>
//                   <li className="flex items-center">
//                     🔖 <span className="ml-2 font-semibold">ISBN13:</span> <span className="ml-2">{book.isbn13 || book.isbn || "Unknown"}</span>
//                   </li>
//                   {/* <li className="flex items-center">
//                     🛠️ <span className="ml-2 font-semibold">Condition:</span> <span className="ml-2">{product.condition_name}</span>
//                   </li> */}

//                 </ul>
//               </div>
//             </div>
//           </div>
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
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import Footer2 from "../Footer/Footer2";
// import { useAuth } from "../Authentication/AuthContext";
// import HashLoader from "react-spinners/HashLoader";

// const ProductDetails1 = () => {
//   const { isbn13 } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { authToken } = useAuth();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://bb.bechobookscan.com/api/getBookByISBN?isbn13=${isbn13}`
//         );
//         const data = await response.json();

//         if (data.status && data.data.length > 0) {
//           setProducts(data.data);
//         } else {
//           setProducts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching book details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isbn13) {
//       fetchBookDetails();
//     }
//   }, [isbn13]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return <div className="text-center p-6 text-red-500">Failed to load product.</div>;
//   }

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-9xl mx-auto space-y-6">
//           {products.map((product) => (
//             <div key={product.condition_id} className="bg-white shadow-lg rounded-lg p-6">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="w-full md:w-1/2">
//                   <img
//                     src={product.book.image || "https://via.placeholder.com/400"}
//                     alt={product.book.title}
//                     className="w-full h-[400px] object-contain rounded-lg"
//                   />
//                 </div>
//                 <div className="w-full md:w-1/2">
//                   <h1 className="text-2xl font-bold">{product.book.title}</h1>
//                   <p className="text-gray-600">Author: {product.book.authors?.join(", ") || "Unknown"}</p>
//                   <p className="text-gray-600">Binding: {product.book.binding || "N/A"}</p>
//                   <p className="text-gray-700 mt-2 font-semibold">Condition: {product.condition_name}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <span className="text-3xl font-bold">₹ {parseFloat(product.price).toFixed(2)}</span>
//                     {product.mrp > 0 && (
//                       <span className="text-green-500 line-through">₹ {parseFloat(product.mrp).toFixed(2)}</span>
//                     )}
//                   </div>
//                   <h2 className="text-xl font-semibold mt-6">Description</h2>
//                   <p className="text-gray-700 mt-2">{product.book.synopsis?.replace(/<br\s*\/?>/g, '') || "No description available."}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
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

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import Footer2 from "../Footer/Footer2";
// import { useAuth } from "../Authentication/AuthContext";
// import HashLoader from "react-spinners/HashLoader";

// const ProductDetails1 = () => {
//   const { isbn13 } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { authToken } = useAuth();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://bb.bechobookscan.com/api/getBookByISBN?isbn13=${isbn13}`
//         );
//         const data = await response.json();

//         if (data.status && data.data.length > 0) {
//           setProducts(data.data); // Store all book conditions separately
//         } else {
//           setProducts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching book details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isbn13) {
//       fetchBookDetails();
//     }
//   }, [isbn13]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return <div className="text-center p-6 text-red-500">Failed to load product.</div>;
//   }

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="bg-gray-100 min-h-screen p-6">
//         {products.map((product, index) => {
//           const book = product.book || {};
//           const price = parseFloat(product.price) || 0;
//           const mrp = parseFloat(product.mrp) || 0;
//           const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : null;

//           return (
//             <div key={index} className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="w-full md:w-1/2 mt-4">
//                   <img
//                     src={book.image || "https://via.placeholder.com/400"}
//                     alt={book.title}
//                     className="w-full h-[400px] object-contain rounded-lg"
//                   />
//                 </div>
//                 <div className="w-full md:w-1/2 mt-4 md:h-[400px] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
//                   <h1 className="text-2xl font-bold">{book.title}</h1>
//                   <p className="text-gray-600">
//                     Author: <span className="font-medium text-green-600">{book.authors?.join(", ") || "Unknown"}</span> | Binding:
//                     <span className="font-medium"> {book.binding || "N/A"}</span>
//                   </p>
//                   {/* <p className="text-gray-600 font-medium">Condition: {product.condition_name}</p> */}
//                   <div className="flex items-center gap-2 mt-2">
//                     <span className="text-3xl font-bold">₹ {price.toFixed(2)}</span>
//                     {mrp > 0 && <span className="text-green-500 line-through">₹ {mrp.toFixed(2)}</span>}
//                     {discount && <span className="text-black px-2 py-1 rounded-md">{discount}% OFF</span>}
//                   </div>
//                   <h2 className="text-xl font-semibold mt-6">Description</h2>
//                   <p className="text-gray-700 mt-2">
//                     {book.synopsis ? book.synopsis.replace(/<br\s*\/?\>/g, '') : "No description available."}
//                   </p>
//                 </div>
//               </div>

//               <br />
//               <div className="p-4 border-t">
//                 <div className="mb-6 text-center">
//                   <button className="text-2xl font-bold text-black-500 border-b-2 border-green-500 pb-1 mr-4">
//                     Details
//                   </button>
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-100 w-[800px] rounded-lg shadow-lg">
//                     <ul className="space-y-4">
//                       <li className="flex items-center">📚 <span className="ml-2 font-semibold">Author:</span> <span className="ml-2">{book.authors?.join(", ") || "Unknown"}</span></li>
//                       <li className="flex items-center">🏢 <span className="ml-2 font-semibold">Publisher:</span> <span className="ml-2">{book.publisher || "Unknown"}</span></li>
//                       <li className="flex items-center">📅 <span className="ml-2 font-semibold">Publishing Year:</span> <span className="ml-2">{book.date_published || "Unknown"}</span></li>
//                     </ul>
//                     <ul className="space-y-4">
//                       <li className="flex items-center">🌐 <span className="ml-2 font-semibold">Language:</span> <span className="ml-2">{book.language || "Unknown"}</span></li>
//                       <li className="flex items-center">🔖 <span className="ml-2 font-semibold">ISBN13:</span> <span className="ml-2">{book.isbn13 || book.isbn || "Unknown"}</span></li>
//                        <li className="flex items-center">
//               🛠️ <span className="ml-2 font-semibold">Condition:</span> <span className="ml-2">{product.condition_name}</span>
//                    </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
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
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import Footer2 from "../Footer/Footer2";
// import { useAuth } from "../Authentication/AuthContext";
// import HashLoader from "react-spinners/HashLoader";

// const ProductDetails1 = () => {
//   const { isbn13 } = useParams(); // Get ISBN from URL
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { authToken } = useAuth();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://bb.bechobookscan.com/api/getBookByISBN?isbn13=${isbn13}`
//         );
//         const data = await response.json();

//         if (data.status && data.data.length > 0) {
//           setProducts(data.data);

//           // Select the first available condition as default
//           setSelectedProduct(data.data[0]); 
//         } else {
//           setProducts([]);
//           setSelectedProduct(null);
//         }
//       } catch (error) {
//         console.error("Error fetching book details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isbn13) {
//       fetchBookDetails();
//     }
//   }, [isbn13]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }

//   if (!selectedProduct) {
//     return <div className="text-center p-6 text-red-500">Failed to load product.</div>;
//   }

//   const book = selectedProduct.book || {};
//   const price = parseFloat(selectedProduct.price) || 0;
//   const mrp = parseFloat(selectedProduct.mrp) || 0;
//   const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : null;

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="w-full md:w-1/2 mt-4">
//               <img
//                 src={book.image || "https://via.placeholder.com/400"}
//                 alt={book.title}
//                 className="w-full h-[400px] object-contain rounded-lg"
//               />
//             </div>

//             <div className="w-full md:w-1/2 mt-4 md:h-[400px] overflow-y-auto scrollbar-hide">
//               <h1 className="text-2xl font-bold">{book.title}</h1>
//               <p className="text-gray-600">
//                 Author: <span className="font-medium text-green-600">{book.authors?.join(", ") || "Unknown"}</span> | Binding:
//                 <span className="font-medium"> {book.binding || "N/A"}</span>
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-3xl font-bold">₹ {price.toFixed(2)}</span>
//                 {mrp > 0 && <span className="text-green-500 line-through">₹ {mrp.toFixed(2)}</span>}
//                 {discount && <span className="text-black px-2 py-1 rounded-md">{discount}% OFF</span>}
//               </div>
//               <h2 className="text-xl font-semibold mt-6">Condition</h2>
//               <p className="text-gray-700 mt-2">{selectedProduct.condition_name || "N/A"}</p>

//               <h2 className="text-xl font-semibold mt-6">Description</h2>
//               <p className="text-gray-700 mt-2">
//                 {book.synopsis ? book.synopsis.replace(/<br\s*\/?>/g, '') : "No description available."}
//               </p>
//             </div>
//           </div>

//           <br />
//           <div className="p-4 border-t">
//             <div className="mb-6 text-center">
//               <button className="text-2xl font-bold text-black-500 border-b-2 border-green-500 pb-1 mr-4">
//                 Details
//               </button>
//             </div>

//             <div className="flex items-center justify-center">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-100 w-[800px] rounded-lg shadow-lg">
//                 <ul className="space-y-4">
//                   <li className="flex items-center">
//                     📚 <span className="ml-2 font-semibold">Author:</span> <span className="ml-2">{book.authors?.join(", ") || "Unknown"}</span>
//                   </li>
//                   <li className="flex items-center">
//                     🏢 <span className="ml-2 font-semibold">Publisher:</span> <span className="ml-2">{book.publisher || "Unknown"}</span>
//                   </li>
//                   <li className="flex items-center">
//                     📅 <span className="ml-2 font-semibold">Publishing Year:</span> <span className="ml-2">{book.date_published || "Unknown"}</span>
//                   </li>
//                 </ul>
//                 <ul className="space-y-4">
//                   <li className="flex items-center">
//                     🌐 <span className="ml-2 font-semibold">Language:</span> <span className="ml-2">{book.language || "Unknown"}</span>
//                   </li>
//                   <li className="flex items-center">
//                     🔖 <span className="ml-2 font-semibold">ISBN13:</span> <span className="ml-2">{book.isbn13 || book.isbn || "Unknown"}</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Condition Selector */}
//           {products.length > 1 && (
//             <div className="p-4 border-t text-center">
//               <h2 className="text-lg font-bold">Select Condition</h2>
//               <div className="flex justify-center mt-2 space-x-4">
//                 {products.map((product) => (
//                   <button
//                     key={product.condition_id}
//                     className={`px-4 py-2 rounded-lg ${selectedProduct.condition_id === product.condition_id ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
//                     onClick={() => setSelectedProduct(product)}
//                   >
//                     {product.condition_name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
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
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useCart } from "../CartContext";

const ProductDetails1 = () => {
  const { isbn13 } = useParams(); // Get ISBN from URL
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();
  const location = useLocation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const hideActions = false;
  const { cartItems, setCartItems } = useCart();
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://bb.bechobookscan.com/api/getBookByISBN?isbn13=${isbn13}`
        );
        const data = await response.json();

        if (data.status && data.data.length > 0) {
          
          setProducts(data.data);
          setSelectedProduct(data.data[0]); // Select the first available condition as default
        } else {
          setProducts([]);
          setSelectedProduct(null);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isbn13) {
      fetchBookDetails();
    }
  }, [isbn13]);
  const [quantity, setQuantity] = useState(1);


  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1 || newQuantity > book.stocks) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `You cannot select more than ${book.stocks} items.`,
      });
      return;
    }
    setQuantity(newQuantity);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }

  // if (!selectedProduct) {
  //   return <div className="text-center p-6 text-red-500">Insufficient Stock available </div>;
  // }
  if (!selectedProduct) {
    
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center">
         <span className="font-semibold">Insufficient Stock Available</span> 
        </div>
      </div>
    );
  }
  
  // const handleAddToCart = async () => {
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

  //   // Ensure we have the correct book_id from selectedProduct
  //   if (!selectedProduct || !selectedProduct.book_id) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Book ID not found. Please try again.",
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
  //       body: JSON.stringify({
  //         book_id: selectedProduct.book_id,  // Ensure correct book_id is sent
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.status) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Added to Cart",
  //         text: "Book added to cart successfully!",
  //       }).then(() => {
  //         // navigate("/cart"); // Navigate to cart page
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

//  const handleAddToCart = async (product) => {
//      if (!authToken) {
//        Swal.fire({
//          icon: "warning",
//          title: "You are not logged in!",
//          text: "Please log in to add items to your cart.",
//          confirmButtonText: "Login",
//          showCancelButton: true,
//          cancelButtonText: "Cancel",
//        }).then((result) => {
//          if (result.isConfirmed) {
//            navigate("/login");
//          }
//        });
//        return;
//      }
   
//      // Check if the product is already in the cart
//      const isProductInCart = cartItems.some((item) => item.book_id === product.id);
   
//      if (isProductInCart) {
//        Swal.fire({
//          icon: "warning",
//          title: "Already in Cart",
//          text: "This book is already in your cart!",
//        });
//        return;
//      }
   
//      try {
//        const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
//          method: "POST",
//          headers: {
//            "Content-Type": "application/json",
//            Authorization: `Bearer ${authToken}`,
//          },
//          body: JSON.stringify({ book_id: product.id }), // Ensure the correct field is sent
//        });
   
//        const data = await response.json();
   
//        if (data.status) {
//          Swal.fire({
//            icon: "success",
//            title: "Added to Cart",
//            text: "Book added to cart successfully!",
//          }).then(() => {
//           //  navigate("/cart");
//          });
   
//          // Update the cartItems state with the new item
//          setCartItems((prevItems) => [
//            ...prevItems,
//            { ...product, book_id: product.id }, // Ensure the correct structure
//          ]);
//        } else {
//          Swal.fire({
//            icon: "error",
//            title: "Failed to Add",
//            text: data.message || "Failed to add book to cart.",
//          });
//        }
//      } catch (error) {
//        Swal.fire({
//          icon: "error",
//          title: "Error",
//          text: error.message || "Something went wrong. Please try again.",
//        });
//      }
//    };
const handleAddToCart = async () => {
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
  const isProductInCart = cartItems.some((item) => item.book_id === selectedProduct.book_id);

  if (isProductInCart) {
    Swal.fire({
      icon: "warning",
      title: "Already in Cart",
      text: "This book is already in your cart!",
    });
    return;
  }

  try {
    const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ book_id: selectedProduct.book_id }), // Use selectedProduct.book_id
    });

    const data = await response.json();

    if (data.status) {
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "Book added to cart successfully!",
      });

      // Update the cartItems state with the new item
      setCartItems((prevItems) => [
        ...prevItems,
        { ...selectedProduct, book_id: selectedProduct.book_id }, // Ensure the correct structure
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
  const handleAddToWishlist = async () => {
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

    // Ensure we have the correct book_id from selectedProduct
    if (!selectedProduct || !selectedProduct.book_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Book ID not found. Please try again.",
      });
      return;
    }

    try {
      const response = await fetch("https://bb.bechobookscan.com/api/addToWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          book_id: selectedProduct.book_id, // Use correct book_id
        }),
      });

      const data = await response.json();

      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: "Book added to wishlist successfully!",
        }).then(() => {
          navigate("/wishlist");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Already in Wishlist",
          text: "Book is already added in the wishlist.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
      console.error("Error adding to wishlist:", error);
    }
  };


  const book = selectedProduct.book || {};
  const price = parseFloat(selectedProduct.price) || 0;
  const mrp = parseFloat(selectedProduct.mrp) || 0;
  const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : null;
  const cleanSynopsis = book.synopsis ? book.synopsis.replace(/<br\s*\/?>/g, "") : "No description available.";
  const shortDescription = cleanSynopsis.slice(0, 70) + "...";
  return (
    <>
      <Header />
      <Nav />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 mt-4">
              <img
                src={book.image || "https://via.placeholder.com/400"}
                alt={book.title}
                className="w-full h-[400px] object-contain rounded-lg"
              />
            </div>

            <div className="w-full md:w-1/2 mt-4 md:h-[400px] overflow-y-auto scrollbar-hide">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              {/* <p className="text-gray-600">
                Author: <span className="font-medium text-green-600">{book.authors?.join(", ") || "Unknown"}</span> | Binding:
                <span className="font-medium"> {book.binding || "N/A"}</span>
              </p> */}
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
                    disabled={quantity === book.stocks}
                  >
                    +
                  </button>

                </div>
                <p className="text-gray-500 text-sm mt-2 text-left">
                  ({book.stocks} available)
                </p>
              </div> */}
              {/* <div className="flex space-x-4">
                <button
                   onClick={handleAddToCart}
                  className="flex items-center px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors mt-4"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={handleAddToWishlist}
                 
                  className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-4"
                >
                  ❤️ Add to Wishlist
                </button>
              </div> */}
              {!hideActions && (
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors mt-4"
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    onClick={handleAddToWishlist}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-4"
                  >
                    ❤️ Add to Wishlist
                  </button>
                </div>
              )}

              {products.length > 1 ? (
                <div className="p-4 border-t text-start">
                  <h2 className="text-lg font-bold">Select Condition</h2>
                  <div className="flex justify-start mt-2 space-x-4">
                    {products.map((product) => (
                      <button
                        key={product.condition_id}
                        className={`px-4 py-2 rounded-lg ${selectedProduct.condition_id === product.condition_id
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-black"
                          }`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.condition_name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mt-2"></p>
              )}

              <h2 className="text-xl font-semibold mt-6">Description</h2>
              {/* <p className="text-gray-700 mt-2 pr-4">
                {book.synopsis ? book.synopsis.replace(/<br\s*\/?>/g, '') : "No description available."}
              </p> */}
              <p className="text-gray-700 mt-2 pr-4">
                {/* Show full description on larger screens */}
                <span className="hidden sm:inline">{cleanSynopsis}</span>

                {/* Show truncated description on mobile with Read More */}
                <span className="sm:hidden">
                  {showFullDescription ? cleanSynopsis : shortDescription}
                </span>
              </p>

              {/* Read More Button for Mobile */}
              {!showFullDescription && (
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
                  {/* <li className="flex items-center">
                    📚 <span className="ml-2 font-semibold">Author:</span> <span className="ml-2">{book.authors?.join(", ") || "Unknown"}</span>
                  </li> */}
                  <li className="flex items-center">
    📚 <span className="ml-2 font-semibold">Author:</span>{" "}
    <span className="ml-2">
      {Array.isArray(book.authors)
        ? book.authors.join(", ")
        : book.authors || "Unknown"}
    </span>
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
                    🔖 <span className="ml-2 font-semibold">Condition:</span> <span className="ml-2">{selectedProduct.condition_name || "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="md:inline">
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails1;
