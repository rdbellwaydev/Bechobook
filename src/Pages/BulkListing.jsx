import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Nav from "../components/Header/Nav";
import Footer from "../components/Footer/Footer";
import ApiService, { Base_url } from "../components/ApiController/ApiController";


export default function BulkListing() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
const [maxPrice, setMaxPrice] = useState(1000);
  // Filters
  const [conditionFilter, setConditionFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);

  const fetchbulkbooks =() =>{
    ApiService.bulkListing().then((response)=>{
      if(response.data.status === true){
         setBooks(response.data.data.data);
         setPriceRange(parseInt(response.data.highest_price))
         setMaxPrice(parseInt(response.data.highest_price))
      }
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
  useEffect(() => {
    // API call simulation
    fetchCategories()
    fetchConditions()
fetchbulkbooks()
    setQuantities(books.reduce((acc, book) => ({ ...acc, [book.id]: 1 }), {}));
  }, []);

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleSelectBook = (id) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const filteredBooks = books.filter(
    (book) =>
      (!conditionFilter || book.condition === conditionFilter) &&
      (!categoryFilter || book.category === categoryFilter) &&
      book.price <= priceRange
  );

  const handleAddSelectedToCart = () => {
    const booksToAdd = books.filter((book) => selectedBooks.includes(book.id)).map((book)=>({
           ...book,
           quantity : quantities[book.id] || 1
    }));
    console.log("Books to add to cart:", booksToAdd);
    alert("Books added to cart!");
  };

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
      onChange={(e) => {
        const searchTerm = e.target.value.toLowerCase();
        setBooks(
          dummyBooks.filter((book) =>
            book.title.toLowerCase().includes(searchTerm)
          )
        );
      }}
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
          Add Selected to Cart
        </button>
      </div>

      {/* Book List */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredBooks.map((book) => (
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

  {/* Quantity Selector */}
  <div className="flex items-center gap-2 mt-3">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleQuantityChange(book.id, -1);
      }}
      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
    >
      -
    </button>
    <span>{quantities[book.id]}</span>
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
</div>

        ))}
      </div>
    </div>
     <Footer />
        </>
  );
}
