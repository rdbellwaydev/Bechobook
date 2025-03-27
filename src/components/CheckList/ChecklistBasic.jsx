// import React, { useEffect, useState } from "react";
// import { useBrochureService } from "../ApiController/ApiController";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";

// const CheckList = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]); // Filtered and sorted books
//   const [loading, setLoading] = useState(true);
//   const { getBasicBrochureBooks } = useBrochureService();
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [sortBy, setSortBy] = useState("Select");
//   const [isOpen, setIsOpen] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Fetch books on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getBasicBrochureBooks();
//         setBooks(result.data || []); // Default to empty array if data is undefined
//         setFilteredBooks(result.data || []); // Display all books initially
//         setTotalPrice(result.total_price || 0);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Extract unique categories dynamically
//   const categories = [
//     ...new Set(books.map((bookItem) => bookItem.category?.name).filter(Boolean)),
//   ];

//   // Toggle filter dropdown
//   const handleToggle = () => {
//     setIsOpen((prev) => !prev);
//   };

//   // Toggle filter selection
//   const toggleCheckbox = (category) => {
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       [category]: !prevFilters[category],
//     }));
//   };

//   // Handle sort selection
//   const handleSortSelection = (option) => {
//     setSortBy(option);
//     setIsSortOpen(false); // Close dropdown after selection
//   };

//   const handleToggleSort = () => {
//     setIsSortOpen(!isSortOpen);
//   };

//   // Apply filters and sorting together
//   useEffect(() => {
//     let updatedBooks = books;

//     // Apply category filters
//     const activeFilters = Object.keys(selectedFilters).filter(
//       (key) => selectedFilters[key]
//     );
//     if (activeFilters.length > 0) {
//       updatedBooks = updatedBooks.filter((bookItem) =>
//         activeFilters.includes(bookItem.category?.name)
//       );
//     }

//     // Apply sorting
//     if (sortBy === "Low to High") {
//       updatedBooks = [...updatedBooks].sort((a, b) => (a.price || 0) - (b.price || 0));
//     } else if (sortBy === "High to Low") {
//       updatedBooks = [...updatedBooks].sort((a, b) => (b.price || 0) - (a.price || 0));
//     }

//     setFilteredBooks(updatedBooks);
//   }, [books, selectedFilters, sortBy]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div>
//         <div className="w-full bg-gray-100 h-[100px] flex justify-between items-center">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-700 ml-12">
//               Total sum of books: <span className="text-blue-600"> ₹{totalPrice}</span>
//             </h2>
//           </div>

//           <div className="flex space-x-4 mr-12">
//             {/* Filter Dropdown */}
//             <div className="relative rounded-md">
//               <div
//                 className="flex justify-between items-center cursor-pointer bg-white border rounded px-4 py-2"
//                 onClick={handleToggle}
//               >
//                 <span className="font-semibold text-gray-700">Filter by type</span>
//                 <span className="text-gray-600 text-sm ml-2">
//                   {isOpen ? "▼" : "▲"}
//                 </span>
//               </div>

//               {isOpen && (
//                 <div className="absolute left-0 top-full w-full bg-white border rounded shadow-md z-10">
//                   <div className="space-y-2 p-4">
//                     {categories.map((category) => (
//                       <label
//                         key={category}
//                         className="flex items-center space-x-2 cursor-pointer"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedFilters[category] || false}
//                           onChange={() => toggleCheckbox(category)}
//                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <span className="text-gray-700 capitalize">{category}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Sort Dropdown */}
//             <div className="relative">
//               <div
//                 className="flex justify-between items-center cursor-pointer bg-white border rounded px-4 py-2 shadow"
//                 onClick={handleToggleSort}
//               >
//                 <span className="font-semibold text-gray-700">
//                   Sort By : <span className="text-black font-bold">{sortBy}</span>
//                 </span>
//                 <span className="text-gray-600 text-sm ml-2">
//                   {isSortOpen ? "▲" : "▼"}
//                 </span>
//               </div>

//               {isSortOpen && (
//                 <div className="absolute right-0 mt-2 w-full bg-white border rounded shadow-md z-10">
//                   <div className="space-y-2 p-2">
//                     <div
//                       className={`cursor-pointer px-2 py-1 rounded ${
//                         sortBy === "Select"
//                           ? "bg-blue-100 text-blue-700 font-bold"
//                           : "text-gray-700 hover:bg-gray-200"
//                       }`}
//                       onClick={() => handleSortSelection("Select")}
//                     >
//                       Select
//                     </div>
//                     {["Low to High", "High to Low"].map((option, index) => (
//                       <div
//                         key={index}
//                         className={`cursor-pointer px-2 py-1 rounded ${
//                           sortBy === option
//                             ? "bg-blue-100 text-blue-700 font-bold"
//                             : "text-gray-700 hover:bg-gray-200"
//                         }`}
//                         onClick={() => handleSortSelection(option)}
//                       >
//                         {option}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Book Grid */}
//         {filteredBooks.length === 0 ? (
//           <p>No books available</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-10">
//             {filteredBooks.map((bookItem) => {
//               const { book, price, mrp } = bookItem;
//               const bookImage = book?.image || "placeholder.jpg";
//               const bookTitle = book?.title_long || "Unknown Title";
//               const bookAuthor = (book?.authors || []).join(", ") || "Unknown Author";

//               return (
//                 <div
//                   key={book.isbn13}
//                   className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 w-48"
//                 >
//                   <img
//                     src={bookImage}
//                     alt={bookTitle}
//                     className="w-full h-40 object-contain mb-2 rounded"
//                   />
//                   <h2 className="text-lg font-semibold text-gray-800 text-center mb-1">
//                     {bookTitle}
//                   </h2>
//                   <p className="text-sm text-gray-600 text-center mb-1">{bookAuthor}</p>
//                   <div className="flex items-center justify-center mt-1">
//                     <span className="text-lg font-bold text-green-600">
//                       ₹{price || "N/A"}
//                     </span>
//                     <span className="text-sm text-gray-500 line-through ml-2">
//                       ₹{mrp || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//                 <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-6">
//            <div className="flex justify-between py-2 border-b"> <span className="text-gray-700">Subtotal</span> <span className="text-gray-700">₹{totalPrice}</span> </div>
//           <div className="flex justify-between py-2 border-b mt-2"> <span className="text-gray-700">Total</span> <span className="text-gray-700">₹{totalPrice}</span> </div>
//          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300">Contact us </button> </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CheckList;


import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
const CheckList = () => {
  const [books, setBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortBy, setSortBy] = useState("Select");
  const [isOpen, setIsOpen] = useState(false);
  const { authToken } = useAuth();
const navigate = useNavigate();
  const fetchBooks = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bb.bechobookscan.com/api/basic-lite-brochure-books",
        { params: { page } }
      );

      const { data, pagination, total_price } = response.data;
      setBooks(data);
      setFilteredBooks(data); // Initialize filteredBooks with the fetched data
      setTotalPrice(total_price || 0);
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.last_page);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [books, selectedFilters, sortBy]);

  const applyFiltersAndSorting = () => {
    let updatedBooks = [...books];

    // Apply filters
    const activeFilters = Object.keys(selectedFilters).filter(
      (key) => selectedFilters[key]
    );

    if (activeFilters.length > 0) {
      updatedBooks = updatedBooks.filter((book) =>
        activeFilters.includes(book.category?.name || "")
      );
    }

    // Apply sorting
    if (sortBy === "Low to High") {
      updatedBooks.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "High to Low") {
      updatedBooks.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredBooks(updatedBooks);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const categories = [
    ...new Set(books.map((bookItem) => bookItem.category?.name).filter(Boolean)),
  ];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleCheckbox = (category) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleSortSelection = (option) => {
    setSortBy(option);
    setIsSortOpen(false);
  };

  const handleToggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  // const handleContactUs = async () => {
  //   if (!authToken) {
  //     Swal.fire("Error", "You are not authenticated. Please log in.", "error");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "https://bb.bechobookscan.com/api/createOrder",
  //       {
  //         brochure_type: "average",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     Swal.fire("Success", "Order created successfully, someone from our team will consult you.", "success");
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //     const errorMessage =
  //       error.response?.data?.message || "Something went wrong. Please try again.";
  //     Swal.fire("Error", errorMessage, "error");
  //   }
  // };
  const handleContactUs = async () => {
    if (!authToken) {
      Swal.fire("Error", "You are not authenticated. Please log in.", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://bb.bechobookscan.com/api/createQuotation",
        {
          brochure_type: "basic_lite",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      Swal.fire({
                icon: "success",
                title: "Order Placed!",
                text: "Your order has been placed successfully. Redirecting to call...",
                confirmButtonColor: "#28a745",
              }).then(() => {
        // Redirect to the phone dialer with a specific phone number
       
        window.location.href = "tel:+91 79877 89150"; // Change this to the actual phone number
        // navigate("/")
      });
    } catch (error) {
      console.error("Error creating order:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  const formatArrayOrString = (data) => {
    if (Array.isArray(data)) {
      return data.join(", ");
    } else if (typeof data === "string") {
      return data;
    }
    return "Unknown";
  };
  return (
    <>
      <Header />
      <Nav />
      <div className="w-full bg-gray-100 h-auto md:h-[100px] flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-2 md:py-0">
        {/* Total Sum Section */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Total sum of books: <span className="text-blue-600"> ₹{totalPrice}</span>
          </h2>
        </div>

        {/* Filter & Sort Section */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-48">
            <div
              className="flex justify-between items-center cursor-pointer bg-white border rounded px-4 py-2"
              onClick={handleToggle}
            >
              <span className="font-semibold text-gray-700">Filter by type</span>
              <span className="text-gray-600 text-sm ml-2">
                {isOpen ? "▼" : "▲"}
              </span>
            </div>

            {isOpen && (
              <div className="absolute left-0 top-full w-full bg-white border rounded shadow-md z-10">
                <div className="space-y-2 p-4">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters[category] || false}
                        onChange={() => toggleCheckbox(category)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <div
              className="flex justify-between items-center cursor-pointer bg-white border rounded px-4 py-2 shadow"
              onClick={handleToggleSort}
            >
              <span className="font-semibold text-gray-700">
                Sort By : <span className="text-black font-bold">{sortBy}</span>
              </span>
              <span className="text-gray-600 text-sm ml-2">
                {isSortOpen ? "▼" : "▲"}
              </span>
            </div>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white border rounded shadow-md z-10">
                <div className="space-y-2 p-2">
                  <div
                    className={`cursor-pointer px-2 py-1 rounded ${sortBy === "Select"
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "text-gray-700 hover:bg-gray-200"
                      }`}
                    onClick={() => handleSortSelection("Select")}
                  >
                    Select
                  </div>
                  {["Low to High", "High to Low"].map((option, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer px-2 py-1 rounded ${sortBy === option
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "text-gray-700 hover:bg-gray-200"
                        }`}
                      onClick={() => handleSortSelection(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-8">
          {filteredBooks.map((bookItem) => {
            const { book, price, mrp } = bookItem;
            const bookImage = book?.image || "placeholder.jpg";
            const bookTitle = book?.title_long || "Unknown Title";
            // const bookAuthor = (book?.authors || []).join(", ") || "Unknown Author";
            const bookAuthor = formatArrayOrString(book?.authors); 
            return (
              <div
                key={book.isbn13}
                className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 w-full sm:w-48"
                onClick={() => navigate(`/book/${book.isbn13}`, { state: { hideActions: true } })}
              >
                <img
                  src={bookImage}
                  alt={bookTitle}
                  className="w-full h-40 object-contain mb-2 rounded"
                />
                <h2 className="text-sm sm:text-lg font-semibold text-gray-800 text-center mb-1">
                  {bookTitle}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-1">
                  {bookAuthor}
                </p>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-base sm:text-lg font-bold text-green-600">
                    ₹{price || "N/A"}
                  </span>
                  <span className="text-xs sm:text-sm text-orange-400 line-through ml-2">
                    ₹{mrp || "N/A"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Summary */}
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
        <button
          onClick={handleContactUs}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckList;