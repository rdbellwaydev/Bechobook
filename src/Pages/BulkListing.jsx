import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Nav from "../components/Header/Nav";
import Footer from "../components/Footer/Footer";

// Dummy Data (Replace with API response)
const dummyBooks = [
  { id: 1, title: "Book 1", price: 200, category: "Fiction", condition: "New", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Book 2", price: 150, category: "Education", condition: "Used", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Book 3", price: 500, category: "Fiction", condition: "New", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Book 4", price: 300, category: "Science", condition: "New", image: "https://via.placeholder.com/150" },
];

export default function BulkListing() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);

  // Filters
  const [conditionFilter, setConditionFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState(1000);

  useEffect(() => {
    // API call simulation
    setBooks(dummyBooks);
    setQuantities(dummyBooks.reduce((acc, book) => ({ ...acc, [book.id]: 1 }), {}));
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
    const booksToAdd = books.filter((book) => selectedBooks.includes(book.id));
    console.log("Books to add to cart:", booksToAdd);
    alert("Books added to cart!");
  };

  return (
    <>
     <Header />
      <Nav />
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-black">Bulk Book Listing</h2>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Condition</label>
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full bg-white text-black"
            >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full bg-white text-black"
            >
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Education">Education</option>
            <option value="Science">Science</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price: ₹0 - ₹{priceRange}</label>
          <input
            type="range"
            min="0"
            max="1000"
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
      src={book.image}
      alt={book.title}
      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
    />
  </div>
  <h3 className="font-semibold text-lg text-black truncate">{book.title}</h3>
  <p className="text-gray-600 text-sm">
    {book.category} • {book.condition}
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
