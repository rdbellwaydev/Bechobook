import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import { useAuth } from "../Authentication/AuthContext";
import { useCart } from "../CartContext";
import { Base_url } from "../ApiController/ApiController";
const CatalogBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const fetchCatalogBooks = async () => {
    try {
      setLoading(true);
      console.log("Fetching books from API...");

      const response = await fetch(Base_url+"getBooksByCatalog?catalogs=featured", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      if (!data.status || !data.data) {
        throw new Error("Invalid data format received.");
      }

      setBooks(data.data);
    } catch (error) {
      console.error("Error fetching catalog books:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
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
  useEffect(() => {
    const fetchCartData = async () => {
      if (!authToken) {
        console.warn("Auth Token is missing!");
        return;
      }
  
      console.log("Fetching cart data...");
  
      setLoading(true); // ✅ Set loading before fetching
  
      try {
        const response = await fetch(
          `${Base_url}getCart?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
  
        console.log("API Response Status:", response.status);
  
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
  
        const data = await response.json();
        console.log("Cart Data:", data); // ✅ Debugging log
  
        // ✅ Ensure valid data before updating state
        setCartItems(data.data || []);
        setTotalPrice(data.total_price ?? 0);
        setTotalPages(data.pagination?.last_page ?? 1);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };
  
    fetchCartData();
  }, [authToken, currentPage]); // ✅ Dependency array
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
            //  navigate("/cart");
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
  useEffect(() => {
    fetchCatalogBooks();
  }, []);

  return (
    <>
      <Header />
      <Nav />
      <div className="flex justify-center items-center min-h-screen pb-24 pt-10">
     
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-center text-3xl border-b-4 w-fit mx-auto pb-2 rounded border-lime-600 mb-4">Featured</h2>
          {loading ? (
            // <p className="text-center text-lg font-semibold">Loading books...</p>
            <div className="flex justify-center items-center min-h-screen">
              <HashLoader color="#4A90E2" size={80} />
            </div>
          ) : books.length === 0 ? (
            <p className="text-center text-gray-500 font-semibold">No books found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 w-full">
              
              {books.map((book) => (
                <div
                  key={book.id}
                  className="relative border p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
                  onClick={() => navigate(`/product/${book.id}`)}
                >
                  
                  <img
                    src={book.book.image || "https://via.placeholder.com/150"}  // Corrected path
                    alt={book.book.title || "Book Image"}  // Corrected path
                    className="w-full h-45 object-contain"
                  />
                  <h2 className="font-semibold mt-2 truncate w-full">{book.book.title || "Unknown Title"}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-black">₹{book.price}</span>
                  </div>
                  <div className="flex justify-end items-center mt-2"> {/* Ensures button stays at the bottom */}
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
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatalogBooks;
