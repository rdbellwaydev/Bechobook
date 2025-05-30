import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { HashLoader } from "react-spinners";
import { Base_url } from "../ApiController/ApiController";
import bookError from "../../assets/bookError.png";

const CheckList = () => {
  const [books, setBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilters = searchParams.get("filters")?.split(",") || [];
  const sortBy = searchParams.get("sort") || "Select";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updateSearchParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        newParams.delete(key);
      } else {
        newParams.set(key, Array.isArray(value) ? value.join(",") : value);
      }
    });
    setSearchParams(newParams);
  };

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Base_url + "premium-brochure-books", {
        params: {
          page: currentPage,
          category_names: selectedFilters,
          sort: sortBy
        }
      });

      setBooks(response.data.data);
      setTotalPages(response.data.pagination.last_page);
      setTotalPrice(response.data.total_price);
      setCategories(response.data.category_in_book);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, [searchParams.toString()]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      updateSearchParams({ page });
    }
  };

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleToggleSort = () => setIsSortOpen((prev) => !prev);

  const toggleCheckbox = (category) => {
    const updatedFilters = selectedFilters.includes(category)
      ? selectedFilters.filter((c) => c !== category)
      : [...selectedFilters, category];
    updateSearchParams({ filters: updatedFilters, page: 1 });
    setIsOpen(false);
  };

  const handleSortSelection = (option) => {
    updateSearchParams({ sort: option, page: 1 });
    setIsSortOpen(false);
  };

  const handleContactUs = async () => {
    if (!authToken) {
      Swal.fire({
        icon: "error",
        text: "Please Log in first!",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    try {
      await axios.post(
        Base_url + "createQuotation",
        { brochure_type: "premium" },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Redirecting to call...",
        confirmButtonColor: "#28a745",
      }).then(() => {
        window.location.href = "tel:+91 79877 89150";
      });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong.", "error");
    }
  };

  const formatArrayOrString = (data) => {
    return Array.isArray(data) ? data.join(", ") : data || "Unknown";
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

      <div className="w-full bg-gray-100 h-auto md:h-[100px] flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-2 md:py-0">
        <div className="text-center md:text-left mb-2 md:mb-0">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Total sum of books: <span className="text-blue-600"> ₹{totalPrice}</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-48">
            <div
              className="flex justify-between items-center cursor-pointer bg-white border rounded px-4 py-2"
              onClick={handleToggle}
            >
              <span className="font-semibold text-gray-700">Filter by type</span>
              <span className="text-gray-600 text-sm ml-2">{isOpen ? "▼" : "▲"}</span>
            </div>

            {isOpen && (
              <div className="absolute left-0 top-full w-full bg-white border rounded shadow-md z-10">
                <div className="space-y-2 p-4">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(category)}
                        onChange={() => toggleCheckbox(category)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 capitalize">
                        {category.length > 16 ? category.substring(0, 15) + "..." : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-48">
            <div
              className="flex justify-between items-center cursor-pointer bg-white border rounded px-4 py-2 shadow"
              onClick={handleToggleSort}
            >
              <span className="font-semibold text-gray-700">
                Sort By : <span className="text-black font-bold">
                  {sortBy === "low_to_high" ? "Low To High" : sortBy === "high_to_low" ? "High To Low" : "Select"}
                </span>
              </span>
              <span className="text-gray-600 text-sm ml-2">{isSortOpen ? "▼" : "▲"}</span>
            </div>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white border rounded shadow-md z-10">
                <div className="space-y-2 p-2">
                  {["Select", "low_to_high", "high_to_low"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSortSelection(option)}
                      className={`cursor-pointer px-2 py-1 rounded ${
                        sortBy === option ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option === "low_to_high" ? "Low To High" : option === "high_to_low" ? "High To Low" : "Select"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {books.length === 0 ? (
        <p className="p-4 text-center">No books available</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-8">
          {books.map(({ book, price, mrp,quantity }) => (
            <div
              key={book.isbn13}
              className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 w-full sm:w-48"
              onClick={() => navigate(`/book/${book.isbn13}`, { state: { hideActions: true } })}
            >
              {/* <img
                src={book?.image || bookError}
                alt={book?.title_long || "Unknown Title"}
                className="w-full h-40 object-contain mb-2 rounded"
              /> */}
               <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={book?.image || bookError}
                  alt={book?.title_long || "Unknown Title"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                </div>
              <h2 className="text-sm sm:text-lg font-semibold text-gray-800 text-center mb-1">
                {book?.title_long.length > 40 ? book.title_long.substring(0, 50) + "..." : book.title_long}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 text-center mb-1">
                {formatArrayOrString(book?.authors)}
              </p>
              <div className="mt-1 text-xs sm:text-sm text-gray-700 text-center">
  <span className="font-medium text-gray-500">Quantity you'll get: </span>
  <span className="font-semibold text-blue-600">{quantity}</span>
</div>
              <div className="flex items-center justify-center mt-1">
                <span className="text-base sm:text-lg font-bold text-green-600">₹{price || "N/A"}</span>
                <span className="text-xs sm:text-sm text-orange-400 line-through ml-2">₹{mrp || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={handlePageChange} />
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
          onClick={handleContactUs}
          className="mt-4 w-full bg-black text-white py-2 rounded-md transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>

      <Footer />
    </>
  );
};

export default CheckList;
