import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Nav from "../components/Header/Nav";
import Footer from "../components/Footer/Footer";
import ApiService, { Base_url } from "../components/ApiController/ApiController";
import { FaBookOpen, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDebounce from "../components/Debounce";
import Swal from "sweetalert2";


export default function BulkListing() {
  const [books, setBooks] = useState([]);
  const [Allbooks, setAllBooks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();
const [maxPrice, setMaxPrice] = useState(1000);
  const [searchTerm, setSearchTerm] = useState("");
  // Filters
  const [conditionFilter, setConditionFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
const debouncedSearchTerm = useDebounce(searchTerm, 500);
const debouncedPriceRange = useDebounce(priceRange, 500);

const fetchAllbooks = ()=>{
    ApiService.bulkListing({pagination:false}).then((response)=>{
      if(response.data.status === true){
         setAllBooks(response.data.data);
    
      }else{
        setAllBooks([]);
      }
    }).catch((error)=>{
      setAllBooks([]);
    })
}
  const fetchbulkbooks =(filters) =>{
     const userId = localStorage.getItem("user_id");
    ApiService.bulkListing({
    condition_id: filters.conditionFilter || "",
    category_id: filters.categoryFilter || "",
    price_range: filters.priceRange || maxPrice,
    search: filters.searchTerm || "",
    pagination:true,
    user_id : userId || "" 
    }).then((response)=>{
      if(response.data.status === true){
         setBooks(response.data.data.data);

         const initialQuantities = { ...quantities };
  response.data.data.data.forEach(book => {
    initialQuantities[book.id] = quantities[book.id] || 1; // Keep previous if exists
  });
  setQuantities(initialQuantities);
         setPriceRange((prev) => prev || data.highest_price)
         setMaxPrice(parseInt(response.data.highest_price))
      }else{
        setBooks([]);
      }
    }).catch((error)=>{
      setBooks([]);
    })
  }
 const fetchCategories = async () => {
      try {
        const response = await fetch(Base_url+"getCategory");
        const data = await response.json();
        if (data.status) {
          setCategories(data.data); // Set categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
 const fetchConditions = async () => {
      try {
        const response = await fetch(Base_url+"getCondition");
        const data = await response.json();
        if (data.status) {
          setConditions(data.data); // Set categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
// Load from localStorage and fetch data once
useEffect(() => {
  const savedFilters = JSON.parse(localStorage.getItem("bulkListingFilters")) || {};
  const savedCart = JSON.parse(localStorage.getItem("bulkListingCart")) || {};

  if (savedFilters) {
    setConditionFilter(savedFilters.conditionFilter || "");
    setCategoryFilter(savedFilters.categoryFilter || "");
    setPriceRange(savedFilters.priceRange || priceRange);
  }

  if (savedCart) {
    setSelectedBooks(savedCart.selectedBooks || []);
    setQuantities(savedCart.quantities || {});
  }

  fetchCategories();
  fetchConditions();
  fetchAllbooks();
  fetchbulkbooks({
    ...savedFilters,
    ...savedCart
  });
}, []); 
useEffect(() => {
  if (conditionFilter || categoryFilter || debouncedPriceRange || debouncedSearchTerm) {
    fetchbulkbooks({ conditionFilter, categoryFilter, priceRange:debouncedPriceRange, searchTerm:debouncedSearchTerm });
  }
}, [conditionFilter, categoryFilter, debouncedPriceRange, debouncedSearchTerm]);



  const handleQuantityChange = (id, change) => {
    const book = books.find((book)=>  book.id === id);
    const maxstock = parseInt(book?.stocks) || 0;
    console.log(maxstock)
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(maxstock,Math.max(1, (prev[id] || 1) + change)),
    }));
  };

  const handleSelectBook = (id) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const handleAddSelectedToCart = () => {
    // const booksToAdd = books.filter((book) => selectedBooks.includes(book.id)).map((book)=>({
    //        ...book,
    //        book_id : book.id,
    //        quantity : quantities[book.id] || 1
    // }));
const cart = JSON.parse(localStorage.getItem('bulkListingCart')) || { selectedBooks: [], quantities: {} };

console.log(cart.selectedBooks)
const booksToAdd = Allbooks
    .filter((book) => cart.selectedBooks.includes(book.id))
    .map((book) => ({
        ...book,
        book_id: book.id,
        quantity: cart.quantities[book.id] || 1
    }));
    
  ApiService.bulkAddToCart({ books: booksToAdd })
  .then((response) => {
    const { status, added, skipped } = response.data;

    if (status === true) {
      // ✅ All added
      Swal.fire({
        icon: "success",
        title: "Books Added to Cart",
        text: `Added: ${added.length}`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: "top-end",
      });
    } 
    else if (status === "partial") {
      // ⚠️ Partial success
      Swal.fire({
        icon: "warning",
        title: "Some Books Skipped",
        html: `
          <b>Added:</b> ${added.length}<br>
          <b>Skipped:</b> ${skipped.length}<br>
          <b>Reasons:</b> ${skipped.map(item => `${item.title_long}: ${item.reason}`).join(", ")}
        `,
        showConfirmButton: false,
        timer: 4000,
        toast: true,
        position: "top-end",
      });
    } 
    else {
      // ❌ All failed
      Swal.fire({
        icon: "error",
        title: "No Books Added",
        text: skipped.map(item => `${item.title_long}: ${item.reason}`).join(", "),
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: "top-end",
      });
    }

    // Reset cart state if at least one item was added
    if (added.length > 0) {
      localStorage.removeItem("bulkListingCart");
      setSelectedBooks([]);
      setQuantities({});
    }
  })
  .catch((error) => {
    Swal.fire({
      icon: "warning",
      text: "Please Select Book",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top-end",
    });
  });

  };
useEffect(() => {
  localStorage.setItem("bulkListingFilters", JSON.stringify({
    conditionFilter,
    categoryFilter,
    priceRange
  }));
}, [conditionFilter, categoryFilter, priceRange]);

useEffect(() => {
  localStorage.setItem("bulkListingCart", JSON.stringify({
    selectedBooks,
    quantities
  }));
}, [selectedBooks, quantities]);

  return (
    <>
     <Header />
      <Nav />
    <div className="p-6 min-h-screen">
     {/* Heading Left + Search Bar Center */}
<div className="relative flex items-center mb-6">
  {/* Left Heading */}
  <h2 className="text-3xl font-bold text-black">Bulk Book Listing</h2>

  {/* Centered Search */}
  <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xs">
    <input
      type="text"
      placeholder="Search books..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 p-2 rounded w-full bg-white text-black"
    />
  </div>
</div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Condition</label>
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full bg-white text-black"
            >
           <option value='' selected disabled>Select Condition</option>
              {conditions.map((condition)=>{
                return (
                  <option value={condition.id}>{condition.name}</option>
                )
              })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full bg-white text-black"
            >
              <option value='' selected disabled>Select Category</option>
              {categories.map((category)=>{
                return (
                  <option value={category.id}>{category.name}</option>
                )
              })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price: ₹0 - ₹{priceRange}</label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-black"
            />
        </div>

        <button
          onClick={handleAddSelectedToCart}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
          Add to Cart
        </button>
      </div>

      {/* Book List */}
      {books.length > 0 ? ( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {books.map((book) => (
<div
  key={book.id}
  onClick={() => handleSelectBook(book.id)}
  className={`bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col p-4 cursor-pointer border-2 
    ${selectedBooks.includes(book.id) ? "border-black" : "border-transparent"}`}
>
  <div className="relative w-full pb-[100%] mb-4 overflow-hidden rounded-lg">
    <img
      src={book?.book?.image}
      alt={book?.book?.title_long}
      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
    />
       {book.is_in_cart && (
      <div
        className="absolute top-2 right-2 bg-yellow-400 p-2 rounded-full shadow border border-yellow-500"
        title="Already in Cart"
      >
        <FaShoppingCart className="text-black text-sm" />
      </div>
    )}
  </div>
  <h3 className="font-semibold text-lg text-black truncate">{book?.book?.title_long}</h3>
  <p className="text-gray-600 text-sm">
    {book.category_name} • {book.condition_name}
  </p>
  <p className="text-gray-600 text-sm">
    {book?.book?.synopsis.length > 20 ? book?.book?.synopsis.substring(0, 50) + '...' : book?.book?.synopsis}
  </p>
  <p className="text-gray-600 text-sm">
    Stock : {book?.stocks}
  </p>
  <p className="text-black font-bold mt-1">₹{book.price}</p>

{/* Quantity Selector + Info Button */}
<div className="flex items-center justify-between mt-3">
  {/* Quantity Control */}
  <div className="flex items-center gap-2">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleQuantityChange(book.id, -1);
      }}
      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
    >
      -
    </button>

    <span>{quantities[book.id] || 1}</span>

    <button
      onClick={(e) => {
        e.stopPropagation();
        handleQuantityChange(book.id, 1);
      }}
      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
    >
      +
    </button>
  </div>

  {/* Info Button */}
  <button
    onClick={(e) => {
     navigate(`/product/${book.id}`);
    }}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-black shadow"
    title="View Details"
  >
    <FaInfoCircle />
  </button>
</div>
</div>

        ))}
      </div>) : (<div className="flex flex-col items-center justify-center h-64 text-center">
    <FaBookOpen className="text-gray-400 text-5xl mb-3" />
    <p className="text-gray-500 text-lg font-medium">No books found</p>
    <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
  </div>) }
    
    </div>
     <Footer />
        </>
  );
}
