import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { useAuth } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";
import { useCart } from "../CartContext";
import { Base_url } from "../ApiController/ApiController";
import bookError from '../../assets/bookError.png';
import Pagination from "../Pagination/Pagination";

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { cartItems, setCartItems } = useCart();

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState("Books");
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [selectedCondition, setSelectedCondition] = useState(""); // "" = All
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCondition = searchParams.get("condition") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const scrollPositionRef = useRef(0)
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

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("user_id");
      const response = await fetch(
        `${Base_url}getBooksByCategory?category_id=${id}&page=${currentPage}${selectedCondition ? `&condition_name=${selectedCondition}` : ""}${userId ? `&user_id=${userId}` : ""}`
      );
      const data = await response.json();
      if (data.status) {
        setBooks(data.data);
        
        setTotalPages(data.pagination.total_pages);
        setCategoryName(data.data.length > 0 ? data.data[0].category_name : "Books");
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchBooks();
  }, [id,searchParams.toString()]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateSearchParams({ page: newPage });
    }
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
    
        fetchBooks();
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
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [loading]);
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
      
      <div className="flex justify-center flex-col items-center min-h-screen pb-24 pt-10">


        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 w-full">
          {books.length > 0 && (
            <>
            
            <h2 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mb-4">
              {categoryName}
            </h2>
            <div className="flex justify-end mb-4">
  <select
    value={selectedCondition}
    onChange={(e) => {
      updateSearchParams({ condition: e.target.value ,page:1});
    }}
    className="border px-4 py-2 rounded"
  >
    <option value="">All Conditions</option>
    <option value="New Book">New Book</option>
    <option value="Old Book">Old Book</option>
  </select>
</div>
            </>
          )}

          {books.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => navigate(`/product/${book.id}`)}
                    className="border p-4 rounded-lg shadow-md"
                  >
                   <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={book.book?.image || bookError}
                  alt={book.book?.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                </div>
                    <h2 className="font-semibold truncate">
                      {book.book?.title || "No Title"}
                    </h2>
                    {/* <span className="text-lg font-bold">₹{book.price}</span> */}
                    <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-black max-sm:text-base"> {/* Smaller text on mobile */}
                      ₹{book.price.replace(/\$/g, "")}
                    </span>
                    <span className="text-orange-400 line-through text-sm max-sm:text-xs"> {/* Smaller text on mobile */}
                      ₹{book.mrp.replace(/\$/g, "")}
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

              <div className="flex justify-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={handlePageChange}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-lg">No books found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
