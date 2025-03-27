
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Home/bechobook.png"
const CHUNK_SIZE = 100; // Load results in batches of 100

const Nav = () => {
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadedChunks, setLoadedChunks] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);
  // Fetch and process search results
  const fetchSearchResults = async (searchTerm) => {
    if (!searchTerm) {
      setAllResults([]);
      setVisibleResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await fetch(
        `https://bb.bechobookscan.com/api/SearchBooks?search=${searchTerm}`
      );
      const data = await response.json();

      if (data.status && data.data.books.length > 0) {
        let books = data.data.books;

        // Sorting: Prioritize titles that start with the query
        books.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          const queryLower = searchTerm.toLowerCase();

          if (titleA.startsWith(queryLower) && !titleB.startsWith(queryLower)) return -1;
          if (!titleA.startsWith(queryLower) && titleB.startsWith(queryLower)) return 1;
          return titleA.localeCompare(titleB);
        });

        setAllResults(books);
        setVisibleResults(books.slice(0, CHUNK_SIZE)); // Show first 100
        setLoadedChunks(1);
        setShowDropdown(true);
      } else {
        setAllResults([]);
        setVisibleResults([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setAllResults([]);
      setVisibleResults([]);
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://bb.bechobookscan.com/api/getCategory");
        const data = await response.json();
        if (data.status) {
          setCategories(data.data); // Set categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    // Fetch categories from API
    const fetchCatalogs = async () => {
      try {
        const response = await fetch("https://bb.bechobookscan.com/api/getCatalog");
        const data = await response.json();
        if (data.status) {
          setCatalogs(data.data); // Set categories
        }
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    fetchCatalogs();
  }, []);
  // Load more results in batches

  const loadMoreResults = () => {
    const nextChunk = loadedChunks * CHUNK_SIZE;
    const newVisibleResults = allResults.slice(0, nextChunk + CHUNK_SIZE);
    setVisibleResults(newVisibleResults);
    setLoadedChunks((prev) => prev + 1);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSearchResults(value);
  };

  // Handle selecting a search result
  const handleResultClick = (book) => {
    setQuery(book.title);

    setShowDropdown(false);
    navigate(`/book/${book.isbn13}`);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    window.location.reload(); // Force reload after navigation
  };
  return (
    <nav className="bg-[#151515] md:bg-white border-b border-gray-300">

      <div className="flex justify-between items-center py-4 px-4 md:hidden">
        <div className="flex gap-4 items-center">
          <i className="ri-menu-line text-white text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}></i>
          {/* <Link to={"/"} className="bg-white px-4 py-2 rounded flex items-center">LOGO</Link> */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-19 invert w-20" />
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <i className="ri-search-line text-white text-2xl cursor-pointer" onClick={() => setIsSearchVisible(!isSearchVisible)}></i>
          <Link to="/login" className="text-white text-2xl"><i className="ri-user-line"></i></Link>
          <Link to="/cart" className="text-white text-2xl"><i className="ri-shopping-cart-line"></i></Link>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchVisible && (
        <div className="px-4 pb-4 md:hidden">
          <input
            type="search"
            className="outline-none border-2 border-[#dfecce] rounded px-2 py-1 w-full"
            placeholder="Search Here"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(visibleResults.length > 0)}
          />
          {showDropdown && visibleResults.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 mt-1 w-[calc(100%-32px)] max-h-[250px] overflow-y-auto shadow-lg rounded z-10">
              {visibleResults.map((book, index) => (
                <li key={index} className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleResultClick(book)}>
                  <img src={book.image || "https://via.placeholder.com/50"} alt={book.title} className="w-10 h-10 object-cover" />
                  <span>{book.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Mobile Sidebar */}
      <div ref={sidebarRef} className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 overflow-y-auto max-h-screen`}>

        <div className="flex justify-between p-4 border-b border-gray-300">
          <span className="text-xl font-bold">Menu</span>
          <i className="ri-close-line text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}></i>
        </div>

        {/* Mobile Menu Items */}
        <ul className="flex flex-col gap-4 p-4">
          <Link to="/" className="py-2 border-b">Home</Link>
          <Link to="/wishlist" className="py-2 border-b">Wishlist</Link>

          <Link to="/about-us" className="py-2 border-b">About Us</Link>

          {/* Catalogs with Dropdown */}
          <div>
            <button className="w-full text-left py-2 border-b flex justify-between" onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}>
              Catalogs <i className={`ri-arrow-${mobileCatalogOpen ? "up" : "down"}-s-line`}></i>
            </button>
            {mobileCatalogOpen && (
              <ul className="pl-4">
                {catalogs.map((catalog) => (
                  <li key={catalog.id} className="py-1">
                    <Link to={`/${catalog.name.replace(/\s+/g, "-").toLowerCase()}`}>{catalog.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Categories with Dropdown */}
          <div>
            <button className="w-full text-left py-2 border-b flex justify-between" onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}>
              Categories <i className={`ri-arrow-${mobileCategoryOpen ? "up" : "down"}-s-line`}></i>
            </button>
            {mobileCategoryOpen && (
              <ul className="pl-4">
                {categories.map((category) => (
                  <li key={category.id} className="py-1">
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="block"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/profile" className="py-2 border-b">My Account</Link>
          <Link to="/get-in-touch" className="py-2 border-b">Contact Us</Link>
        </ul>
      </div>
      {/* Desktop View */}
      <div className="hidden md:inline w-full text-[1.2vw]">
        <div className="flex justify-between px-20 py-4 items-center w-full">
          {/* <Link to={"/"} className="bg-[#151515] md:text-white px-5 py-1 w-fit">LOGO</Link> */}
          <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-18 w-20" />
        </Link>
          <ul className="flex gap-4">
            <Link to="/">Home</Link>

            <Link to="/about-us">About Us </Link>
            {/* <Link>Catalog <i className="ri-arrow-down-s-line"></i></Link> */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown2(true)}
              onMouseLeave={() => setShowDropdown2(false)}
            >
              <Link className="cursor-pointer flex items-center">
                Catalogs <i className="ri-arrow-down-s-line"></i>
              </Link>

              {/* Dropdown */}
              {showDropdown2 && (
                // <ul className="absolute left-0 mt-1 bg-white border border-gray-300 shadow-lg rounded w-48 z-20">
                // <ul className="absolute left-0 mt-1 bg-white border border-gray-300 shadow-lg rounded w-48 z-20 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                //   {catalogs.map((catalog) => (
                //     <li key={catalog.id} className="p-2 hover:bg-gray-200">
                //       <Link to={route}>{catalog.name}
                //       </Link>
                //     </li>
                //   ))}
                // </ul>
                <ul className="absolute left-0 bg-white border border-gray-300 shadow-lg rounded w-48 z-20 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {catalogs.map((catalog) => {
                    let route = "/category/" + catalog.name.replace(/\s+/g, "-").toLowerCase(); // Default category route

                    if (catalog.name.toLowerCase().includes("featured")) {
                      route = "/featured-products";
                    } else if (catalog.name.toLowerCase().includes("new arrival")) {
                      route = "/new-arrivals";
                    } else if (catalog.name.toLowerCase().includes("most viewed")) {
                      route = "/most-viewed";
                    }

                    return (
                      <li key={catalog.id} className="p-2 hover:bg-gray-200">
                        <Link to={route} className="block w-full h-full">
                          {catalog.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {/* <Link>Categories <i className="ri-arrow-down-s-line"></i></Link> */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown1(true)}
              onMouseLeave={() => setShowDropdown1(false)}
            >
              <Link className="cursor-pointer flex items-center">
                Categories <i className="ri-arrow-down-s-line"></i>
              </Link>

              {/* Dropdown */}
              {showDropdown1 && (
                // <ul className="absolute left-0 mt-1 bg-white border border-gray-300 shadow-lg rounded w-48 z-20">
                <ul className="absolute left-0  bg-white border border-gray-300 shadow-lg rounded w-48 z-20 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {categories.map((category) => (
                    <li key={category.id} className="p-2 hover:bg-gray-200">
                     <Link
  to={`/category/${category.id}`}
  onClick={() => {
    setTimeout(() => {
      window.location.reload();
    }, 100); // Small delay to ensure navigation completes before reload
  }}
>{category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </ul>


          {/* Search Bar with Dropdown */}
          <div className="relative z-10">
            <input
              type="search"
              className="outline-none border-2 border-[#dfecce] rounded px-2 py-1 w-[250px]"
              placeholder="Search Here"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(visibleResults.length > 0)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />

            {showDropdown && visibleResults.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 mt-1 w-[250px] max-h-[250px] overflow-y-auto shadow-lg rounded">
                {visibleResults.map((book, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"

                    onMouseDown={() => handleResultClick(book)}
                  >
                    <img
                      src={book.image || "https://via.placeholder.com/50"}
                      alt={book.title}
                      className="w-10 h-10 object-cover"
                    />
                    <span>{book.title}</span>
                  </li>
                ))}
                {/* Load More Button */}
                {visibleResults.length < allResults.length && (
                  <li
                    className="p-2 text-center text-blue-500 cursor-pointer hover:bg-gray-100"
                    onClick={loadMoreResults}
                  >
                    Load More...
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* <div className="flex gap-2">
            <Link to="/login">
              <i className="ri-user-community-fill"></i>
              <span>Sign in</span>
            </Link>
            <Link to="/signup">
              <span> or Sign Up</span>
            </Link>
          </div> */}
          <div className="flex gap-2">
            <Link to="/login">
              <i className="ri-user-community-fill"></i>
              <span>Sign in</span>
            </Link>
            {!localStorage.getItem("authtoken") && (
              <Link to="/signup">
                <span> or Sign Up</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Nav;
