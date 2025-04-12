
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import { useAuth } from "../Authentication/AuthContext";
// import Swal from "sweetalert2";
// import HashLoader from "react-spinners/HashLoader";
// import { useCart } from "../CartContext";
// const CategoryPage = () => {
//   const { id } = useParams(); // Get category ID from URL
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [categoryName, setCategoryName] = useState(""); // Store category name
//   const { authToken } = useAuth();
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
 
//   // State for filtering and sorting
//   const [selectedCondition, setSelectedCondition] = useState("all"); // Default: show all conditions
//   const [sortOrder, setSortOrder] = useState("default"); // Default: no sorting
//   const [conditions, setConditions] = useState([]); // Store unique conditions from products
// const { cartItems, setCartItems } = useCart();
//   // Fetch books by category
//   useEffect(() => {
//     const fetchBooksByCategory = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=${currentPage}`
//         );
//         const data = await response.json();

//         if (data.status) {
//           setProducts(data.data);
//           setTotalPages(data.pagination.total_pages);
//           setNextPageUrl(data.pagination.next_page_url);
//           setPrevPageUrl(data.pagination.prev_page_url);

//           // Set category name from first product
//           if (data.data.length > 0) {
//             setCategoryName(data.data[0].category_name || "Books");
//           } else {
//             setCategoryName("Books");
//           }

          
//           const uniqueConditions = [
//             ...new Set(data.data.map((product) => product.condition_name)),
//           ];
//           setConditions(uniqueConditions);
//         } else {
//           setProducts([]);
//           setCategoryName("Books");
//         }
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooksByCategory();
//   }, [id, currentPage]);
//   useEffect(() => {
//     const fetchCartData = async () => {
//       if (!authToken) {
//         console.warn("Auth Token is missing!");
//         return;
//       }
  
//       console.log("Fetching cart data...");
  
//       setLoading(true); // ✅ Set loading before fetching
  
//       try {
//         const response = await fetch(
//           `https://bb.bechobookscan.com/api/getCart?page=${currentPage}`,
//           {
//             headers: { Authorization: `Bearer ${authToken}` },
//           }
//         );
  
//         console.log("API Response Status:", response.status);
  
//         if (!response.ok) {
//           throw new Error("Failed to fetch cart data");
//         }
  
//         const data = await response.json();
//         console.log("Cart Data:", data); // ✅ Debugging log
  
//         // ✅ Ensure valid data before updating state
//         setCartItems(data.data || []);
//         setTotalPrice(data.total_price ?? 0);
//         setTotalPages(data.pagination?.last_page ?? 1);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       } finally {
//         setLoading(false); // ✅ Always stop loading
//       }
//     };
  
//     fetchCartData();
//   }, [authToken, currentPage]); // ✅ Dependency array
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }
//   // Handle filtering by condition
//   const handleConditionFilter = (condition) => {
//     setSelectedCondition(condition);
//   };

//   // Handle sorting
//   const handleSortOrder = (order) => {
//     setSortOrder(order);
//   };

//   // Filter and sort products based on selected options
//   const filteredAndSortedProducts = products
//     .filter((product) => {
//       if (selectedCondition === "all") return true;
//       return product.condition_name === selectedCondition;
//     })
//     .sort((a, b) => {
//       if (sortOrder === "price_high_to_low") {
//         return parseFloat(b.price) - parseFloat(a.price);
//       } else if (sortOrder === "price_low_to_high") {
//         return parseFloat(a.price) - parseFloat(b.price);
//       } else {
//         return 0; 
//       }
//     });

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Handle add to cart
//   // const handleAddToCart = async (product) => {
//   //   if (!authToken) {
//   //     Swal.fire({
//   //       icon: "warning",
//   //       title: "You are not logged in!",
//   //       text: "Please log in to add items to your cart.",
//   //       confirmButtonText: "Login",
//   //       showCancelButton: true,
//   //       cancelButtonText: "Cancel",
//   //     }).then((result) => {
//   //       if (result.isConfirmed) {
//   //         navigate("/login");
//   //       }
//   //     });
//   //     return;
//   //   }
//   //   try {
//   //     const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${authToken}`,
//   //       },
//   //       body: JSON.stringify({ book_id: product.id }),
//   //     });

//   //     const data = await response.json();

//   //     if (data.status) {
//   //       Swal.fire({
//   //         icon: "success",
//   //         title: "Added to Cart",
//   //         text: "Book added to cart successfully!",
//   //       }).then(() => {
//   //         navigate("/cart"); // Navigate to cart page
//   //       });
//   //     } else {
//   //       Swal.fire({
//   //         icon: "error",
//   //         title: "Failed to Add",
//   //         text: data.message || "Failed to add book to cart.",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Error",
//   //       text: error.message || "Something went wrong. Please try again.",
//   //     });
//   //   }
//   // };

//   const handleAddToCart = async (product) => {
//     if (!authToken) {
//       Swal.fire({
//         icon: "warning",
//         title: "You are not logged in!",
//         text: "Please log in to add items to your cart.",
//         confirmButtonText: "Login",
//         showCancelButton: true,
//         cancelButtonText: "Cancel",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });
//       return;
//     }
  
//     // Check if the product is already in the cart
//     const isProductInCart = cartItems.some((item) => item.book_id === product.id);
  
//     if (isProductInCart) {
//       Swal.fire({
//         icon: "warning",
//         title: "Already in Cart",
//         text: "This book is already in your cart!",
//       });
//       return;
//     }
  
//     try {
//       const response = await fetch("https://bb.bechobookscan.com/api/addToCart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ book_id: product.id }), // Ensure the correct field is sent
//       });
  
//       const data = await response.json();
  
//       if (data.status) {
//         Swal.fire({
//           icon: "success",
//           title: "Added to Cart",
//           text: "Book added to cart successfully!",
//         }).then(() => {
//           navigate("/cart");
//         });
  
//         // Update the cartItems state with the new item
//         setCartItems((prevItems) => [
//           ...prevItems,
//           { ...product, book_id: product.id }, // Ensure the correct structure
//         ]);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed to Add",
//           text: data.message || "Failed to add book to cart.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Something went wrong. Please try again.",
//       });
//     }
//   };
   
  
//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="flex justify-center items-center min-h-screen pb-24 pt-10">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
//           {/* Show category title only if there are books */}
//           {filteredAndSortedProducts.length > 0 && (
//             <h2 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mb-4">
//               {categoryName}
//             </h2>
//           )}

//           {/* Show filter and sort section only if there are books */}
//           {filteredAndSortedProducts.length > 0 && (
//             <div className="flex flex-col sm:flex-row gap-4 mb-4">
//               {/* Filter by Condition Dropdown */}
//               <div className="flex-1">
//                 <label htmlFor="conditionFilter" className="mr-2 font-semibold">
//                   Filter by Condition:
//                 </label>
//                 <select
//                   id="conditionFilter"
//                   value={selectedCondition}
//                   onChange={(e) => handleConditionFilter(e.target.value)}
//                   className="p-2 border rounded w-full"
//                 >
//                   <option value="all">All Conditions</option>
//                   {conditions.map((condition, index) => (
//                     <option key={index} value={condition}>
//                       {condition}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Sort by Price Dropdown */}
//               <div className="flex-1">
//                 <label htmlFor="sortOrder" className="mr-2 font-semibold">
//                   Sort by Price:
//                 </label>
//                 <select
//                   id="sortOrder"
//                   value={sortOrder}
//                   onChange={(e) => handleSortOrder(e.target.value)}
//                   className="p-2 border rounded w-full"
//                 >
//                   <option value="default">Default</option>
//                   <option value="price_low_to_high">Low to High</option>
//                   <option value="price_high_to_low">High to Low</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Show product grid or "No books found" message */}
//           {filteredAndSortedProducts.length > 0 ? (
//             <>
//               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
//                 {filteredAndSortedProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="relative border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     <img
//                       src={product.book?.image || "https://via.placeholder.com/150"}
//                       alt={product.book?.title || "No Title"}
//                       className="w-full h-45 object-contain"
//                     />
//                     <h2 className="font-semibold mt-2 truncate w-full">
//                       {product.book?.title || "No Title"}
//                     </h2>
//                     <div className="flex items-center justify-between mt-2">
//                       <span className="text-lg font-bold text-black">
//                         ₹{product.price}
//                       </span>
//                       {product.mrp && (
//                         <span className="text-orange-400 line-through text-sm">
//                           ₹{product.mrp}
//                         </span>
//                       )}
//                     </div>
//                     {product.discount && (
//                       <div className="flex items-center justify-between mt-1">
//                         <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                           {product.discount}% OFF
//                         </span>
//                       </div>
//                     )}
//                     <div className="flex justify-end items-center mt-2">
//                       <button
//                         className="bg-white border border-gray-300 p-2 rounded-full shadow-md transition hover:bg-gray-200 flex items-center justify-center"
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent navigating to product page
//                           handleAddToCart(product);
//                         }}
//                       >
//                         <img
//                           src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
//                           alt="Add to Cart"
//                           className="w-5 h-5 max-sm:w-4 max-sm:h-4"
//                         />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Show pagination only if there are books */}
//               <div className="flex justify-center items-center gap-4 mt-6">
//                 <button
//                   className={`bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 ${
//                     !prevPageUrl ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
//                   }`}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={!prevPageUrl}
//                 >
//                   Previous
//                 </button>
//                 <span className="text-lg font-semibold">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   className={`bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 ${
//                     !nextPageUrl ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
//                   }`}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={!nextPageUrl}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             // Show "No books found" message in the center
//             <div className="flex justify-center items-center h-[50vh]">
//               <p className="text-xl text-gray-600">No books found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CategoryPage;
// useEffect(() => {
  //   const fetchAllBooks = async () => {
  //     setLoading(true);
  //     let allBooks = [];
  //     let page = 1;
  //     let totalPagesFetched = 1;

  //     try {
  //       while (page <= totalPagesFetched) {
  //         const response = await fetch(
  //           `https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=${page}`
  //         );
  //         const data = await response.json();

  //         if (data.status) {
  //           allBooks = [...allBooks, ...data.data];
  //           totalPagesFetched = data.pagination.total_pages;
  //           page++;
  //         } else {
  //           break;
  //         }
  //       }

  //       setFullBookList(allBooks);
  //       setFilteredBooks(allBooks); // Initially, show all books
  //       setTotalPages(Math.ceil(allBooks.length / 20)); // Set total pages based on 20 books per page
  //       if (allBooks.length > 0) {
  //         setCategoryName(allBooks[0].category_name || "Books");
  //       } else {
  //         setCategoryName("Books");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching books:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllBooks();
  // }, [id]);



//------------------------------------------------//


    // Apply filtering and sorting
  // useEffect(() => {
  //   let updatedBooks = fullBookList;

  //   // Filter by condition
  //   if (selectedCondition !== "all") {
  //     updatedBooks = updatedBooks.filter(
  //       (book) => book.condition_name === selectedCondition
  //     );
  //   }

  //   // Sort by price
  //   if (sortOrder === "price_high_to_low") {
  //     updatedBooks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  //   } else if (sortOrder === "price_low_to_high") {
  //     updatedBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  //   }

  //   setFilteredBooks(updatedBooks);
  //   setTotalPages(Math.ceil(updatedBooks.length / 20));
  //   setCurrentPage(1); // Reset to page 1 after filtering
  // }, [selectedCondition, sortOrder, fullBookList]);
// Apply filtering and sorting
// useEffect(() => {
//   let updatedBooks = [...fullBookList]; // Create a new array to avoid mutating the original

//   // Filter by condition
//   if (selectedCondition !== "all") {
//     updatedBooks = updatedBooks.filter(
//       (book) => book.condition_name === selectedCondition
//     );
//   }

//   // Sort by price
//   if (sortOrder === "price_high_to_low") {
//     updatedBooks = [...updatedBooks].sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); // Create a new array before sorting
//   } else if (sortOrder === "price_low_to_high") {
//     updatedBooks = [...updatedBooks].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // Create a new array before sorting
//   }

//   setFilteredBooks(updatedBooks);
//   setTotalPages(Math.ceil(updatedBooks.length / 20));
//   setCurrentPage(1); // Reset to page 1 after filtering
// }, [selectedCondition, sortOrder, fullBookList]);
    // useEffect(() => {
  //   const fetchRemainingPages = async () => {
  //     let allBooks = [...fullBookList];
  
  //     for (let page = 2; page <= totalPages; page++) {
  //       try {
  //         const response = await fetch(`https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=${page}`);
  //         const data = await response.json();
  //         if (data.status) {
  //           allBooks = [...allBooks, ...data.data];
  //         }
  //       } catch (error) {
  //         console.error("Error fetching more books:", error);
  //       }
  //     }
  
  //     setFullBookList(allBooks);
  //     setFilteredBooks(allBooks);
  //   };
  
  //   if (totalPages > 1) {
  //     fetchRemainingPages();
  //   }
  // }, [totalPages]);
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { useAuth } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";
import { useCart } from "../CartContext";
import { Base_url } from "../ApiController/ApiController";
import bookError  from '../../assets/bookError.png'
import Pagination from "../Pagination/Pagination";

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { cartItems, setCartItems } = useCart();

  const [loading, setLoading] = useState(true);
  const [fullBookList, setFullBookList] = useState([]); // Store all books
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState("");

  // Filtering and sorting
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  // Fetch all books in the category
  
//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       let allBooks = [];
  
//       try {
//         const response = await fetch(`https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=1`);
//         const data = await response.json();
  
//         if (data.status) {
//           allBooks = [...data.data];
//           setTotalPages(data.pagination.total_pages);
//           setCategoryName(data.data.length > 0 ? data.data[0].category_name : "Books");
//         }
  
//         setFullBookList(allBooks);
//         setFilteredBooks(allBooks); // Show only first-page books initially
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchBooks();
//   }, [id]);
  
  
//   // Fetch remaining pages in parallel for faster loading
// useEffect(() => {
//   const fetchRemainingPages = async () => {
//     if (totalPages <= 1) return; // No need to fetch if there's only one page

//     try {
//       // Create an array of promises to fetch all remaining pages in parallel
//       const fetchPromises = [];
//       for (let page = 2; page <= totalPages; page++) {
//         fetchPromises.push(
//           fetch(`https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=${page}`)
//             .then((res) => res.json())
//         );
//       }

//       // Wait for all fetches to complete
//       const responses = await Promise.all(fetchPromises);

//       // Merge all book data from the fetched responses
//       let allBooks = [...fullBookList];
//       responses.forEach((data) => {
//         if (data.status) {
//           allBooks = [...allBooks, ...data.data];
//         }
//       });

//       setFullBookList(allBooks);
//       setFilteredBooks(allBooks);
//     } catch (error) {
//       console.error("Error fetching more books:", error);
//     }
//   };

//   fetchRemainingPages();
// }, [totalPages, id]); // Added `id` as a dependency to ensure correct fetching on category change


// useEffect(() => {
//   let updatedBooks = [...fullBookList]; // Create a copy to prevent mutations

//   // Filter by condition
//   if (selectedCondition !== "all") {
//     updatedBooks = updatedBooks.filter(
//       (book) => book.condition_name === selectedCondition
//     );
//   }

//   // Sort by price
//   if (sortOrder === "price_high_to_low") {
//     updatedBooks = updatedBooks.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//   } else if (sortOrder === "price_low_to_high") {
//     updatedBooks = updatedBooks.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//   }

//   setFilteredBooks(updatedBooks);
//   setTotalPages(Math.ceil(updatedBooks.length / 20));
//   setCurrentPage(1); // Reset to first page after filtering
// }, [selectedCondition, sortOrder, fullBookList]);

//   // Handle pagination
//   const paginatedBooks = filteredBooks.slice((currentPage - 1) * 20, currentPage * 20);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };
useEffect(() => {
  const fetchBooks = async () => {
    setLoading(true);
    let allBooks = [];

    try {
      // Fetch the first page
      const firstPageResponse = await fetch(`${Base_url}getBooksByCategory?category_id=${id}&page=1`);
      const firstPageData = await firstPageResponse.json();

      if (firstPageData.status) {
        allBooks = [...firstPageData.data];
        setTotalPages(firstPageData.pagination.total_pages);
        setCategoryName(firstPageData.data.length > 0 ? firstPageData.data[0].category_name : "Books");
        console.log(`Page 1 data: ${firstPageData.data.length} books`);
      }

      // Fetch remaining pages in parallel (if there are more pages)
      if (firstPageData.pagination.total_pages > 1) {
        const fetchPromises = [];
        for (let page = 2; page <= firstPageData.pagination.total_pages; page++) {
          fetchPromises.push(
            fetch(`${Base_url}getBooksByCategory?category_id=${id}&page=${page}`)
              .then((res) => res.json())
          );
        }

        // Wait for all fetches to complete
        const responses = await Promise.all(fetchPromises);

        // Merge all book data from the fetched responses
        responses.forEach((data, index) => {
          if (data.status) {
            allBooks = [...allBooks, ...data.data];
            console.log(`Page ${index + 2} data: ${data.data.length} books`);
          }
        });
      }

      // Update state with all fetched books
      console.log("Total books fetched:", allBooks.length);
      setFullBookList(allBooks);
      applyFiltersAndSorting(allBooks); // Apply filtering and sorting after fetching all books
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, [id]);

// Apply filtering and sorting logic
const applyFiltersAndSorting = (books) => {
  let updatedBooks = [...books];

  // Filter by condition
  if (selectedCondition !== "all") {
    updatedBooks = updatedBooks.filter((book) => book.condition_name === selectedCondition);
  }

  // Sort by price
  if (sortOrder === "price_high_to_low") {
    updatedBooks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOrder === "price_low_to_high") {
    updatedBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  setFilteredBooks(updatedBooks);
  setTotalPages(Math.ceil(updatedBooks.length / 10)); // Update total pages for pagination
  setCurrentPage(1); // Reset to first page after filtering/sorting
};

// Reapply filtering and sorting when selectedCondition or sortOrder changes
useEffect(() => {
  applyFiltersAndSorting(fullBookList);
}, [selectedCondition, sortOrder]);

// Pagination logic
const paginatedBooks = filteredBooks.slice((currentPage - 1) * 10, currentPage * 10);

const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    setCurrentPage(newPage);
  }
};

  // Handle condition filter
  const handleConditionFilter = (condition) => {
    setSelectedCondition(condition);
  };

  // Handle sorting
  const handleSortOrder = (order) => {
    
    setSortOrder(order);
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
  
    // Check if the product is already in the cart
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
      const response = await fetch(Base_url+"addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ book_id: book.id }), // Ensure the correct field is sent
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
          { ...book, book_id:book.id }, // Ensure the correct structure
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
    <>
      <Header />
      <Nav />
      <div className="flex justify-center items-center min-h-screen pb-24 pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
          {filteredBooks.length > 0 && (
            <h2 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mb-4">
              {categoryName}
            </h2>
          )}

          {filteredBooks.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="conditionFilter" className="mr-2 font-semibold">
                  Filter by Condition:
                </label>
                <select
                  id="conditionFilter"
                  value={selectedCondition}
                  onChange={(e) => handleConditionFilter(e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="all">All Conditions</option>
                  {[...new Set(fullBookList.map((book) => book.condition_name))].map(
                    (condition, index) => (
                      <option key={index} value={condition}>
                        {condition}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="sortOrder" className="mr-2 font-semibold">
                  Sort by Price:
                </label>
                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={(e) => handleSortOrder(e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="default">Default</option>
                  <option value="price_low_to_high">Low to High</option>
                  <option value="price_high_to_low">High to Low</option>
                </select>
              </div>
            </div>
          )}

          {paginatedBooks.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 w-full">
                {paginatedBooks.map((book,index) => (
                  <div key={book.id}
                
                  onClick={() => navigate(`/product/${book.id}`)} className="border p-4 rounded-lg shadow-md">
                    <img
                      src={book.book?.image || bookError}
                      alt={book.book?.title || "No Title"}
                      className="w-full h-45 object-contain"
                      loading="lazy" 
                    />
                    <h2 className="font-semibold truncate">{book.book?.title || "No Title"}</h2>
                    <span className="text-lg font-bold">₹{book.price}</span>
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
                ))}
                
              </div>

              <div className="flex justify-center items-center gap-4 mt-6">
                {/* <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button> */}
                <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={handlePageChange}
                />
              </div>
            </>
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import { useAuth } from "../Authentication/AuthContext";
// import HashLoader from "react-spinners/HashLoader";
// import { useCart } from "../CartContext";

// const CategoryPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { authToken } = useAuth();
//   const { cartItems, setCartItems } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [fullBookList, setFullBookList] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [categoryName, setCategoryName] = useState("");

//   const [selectedCondition, setSelectedCondition] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");

//   // useEffect(() => {
//   //   const fetchBooks = async () => {
//   //     setLoading(true);
//   //     try {
//   //       let allBooks = [];
//   //       let totalPagesFetched = 1;

//   //       const response = await fetch(`https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=1`);
//   //       const data = await response.json();

//   //       if (data.status) {
//   //         allBooks = [...data.data];
//   //         totalPagesFetched = data.pagination.total_pages;
//   //         setCategoryName(data.data.length > 0 ? data.data[0].category_name : "Books");
//   //       }

//   //       if (totalPagesFetched > 1) {
//   //         const fetchPromises = [];
//   //         for (let page = 2; page <= totalPagesFetched; page++) {
//   //           fetchPromises.push(
//   //             fetch(`https://bb.bechobookscan.com/api/getBooksByCategory?category_id=${id}&page=${page}`).then((res) =>
//   //               res.json()
//   //             )
//   //           );
//   //         }

//   //         const responses = await Promise.all(fetchPromises);
//   //         responses.forEach((data) => {
//   //           if (data.status) {
//   //             allBooks = [...allBooks, ...data.data];
//   //           }
//   //         });
//   //       }

//   //       setFullBookList(allBooks);
//   //       setFilteredBooks(allBooks);
//   //       setTotalPages(Math.ceil(allBooks.length / 20));
//   //     } catch (error) {
//   //       console.error("Error fetching books:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchBooks();
//   // }, [id]);

 
  
//   useEffect(() => {
//     let updatedBooks = [...fullBookList];

//     // **Filter by Condition**
//     if (selectedCondition !== "all") {
//       updatedBooks = updatedBooks.filter((book) => book.condition_name === selectedCondition);
//     }

//     // **Sorting Logic**
//     if (sortOrder === "price_high_to_low") {
//       updatedBooks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//     } else if (sortOrder === "price_low_to_high") {
//       updatedBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//     }

//     setFilteredBooks(updatedBooks);
//     setTotalPages(Math.ceil(updatedBooks.length / 20));
//     setCurrentPage(1);
//   }, [selectedCondition, sortOrder, fullBookList]);

//   // **Pagination after Sorting & Filtering**
//   const paginatedBooks = filteredBooks.slice((currentPage - 1) * 20, currentPage * 20);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="flex justify-center items-center min-h-screen pb-24 pt-10">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
//           {filteredBooks.length > 0 && (
//             <h2 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mb-4">
//               {categoryName}
//             </h2>
//           )}

//           {filteredBooks.length > 0 && (
//             <div className="flex flex-col sm:flex-row gap-4 mb-4">
//               <div className="flex-1">
//                 <label htmlFor="conditionFilter" className="mr-2 font-semibold">
//                   Filter by Condition:
//                 </label>
//                 <select
//                   id="conditionFilter"
//                   value={selectedCondition}
//                   onChange={(e) => setSelectedCondition(e.target.value)}
//                   className="p-2 border rounded w-full"
//                 >
//                   <option value="all">All Conditions</option>
//                   {[...new Set(fullBookList.map((book) => book.condition_name))].map((condition, index) => (
//                     <option key={index} value={condition}>
//                       {condition}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex-1">
//                 <label htmlFor="sortOrder" className="mr-2 font-semibold">
//                   Sort by Price:
//                 </label>
//                 <select
//                   id="sortOrder"
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   className="p-2 border rounded w-full"
//                 >
//                   <option value="default">Default</option>
//                   <option value="price_low_to_high">Low to High</option>
//                   <option value="price_high_to_low">High to Low</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {paginatedBooks.length > 0 ? (
//             <>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 w-full">
//                 {paginatedBooks.map((book) => (
//                   <div key={book.id} onClick={() => navigate(`/product/${book.id}`)} className="border p-4 rounded-lg shadow-md">
//                     <img src={book.book?.image || "https://via.placeholder.com/150"} alt={book.book?.title || "No Title"} className="w-full h-45 object-contain" loading="lazy" />
//                     <h2 className="font-semibold truncate">{book.book?.title || "No Title"}</h2>
//                     <span className="text-lg font-bold">₹{book.price}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-center items-center gap-4 mt-6">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//                   Previous
//                 </button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>No books found.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CategoryPage;
