import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Base_url } from '../components/ApiController/ApiController';
import { HashLoader } from 'react-spinners';
import NoResults from '../assets/no_result.jpg'
export default function SearchResults() {
     const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Simulate fetching results
  useEffect(() => {
    if (!query) return;

    setLoading(true);

    // Replace this with actual API call
    const fetchResults = async () => {
      try {
        const response = await fetch(`${Base_url}SearchBooks?search=${query}`);
        const data = await response.json();
        setResults(data.data.books || []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleResultClick = (book) => {
    
    navigate(`/book/${book.isbn13}`);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }
  return (
    <div className="p-4 max-w-4xl mx-auto">
    <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>

    {loading ? (
      <p>Loading...</p>
    ) : results.length === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
      <img
        src={NoResults}
        alt="No Results"
        className="w-70 h-auto object-contain"
      />
      <p className="text-gray-500 mt-4">No results found</p>
    </div>
    ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((book, index) => (
          <li
            key={index}
            className="border rounded p-3 shadow hover:shadow-md transition cursor-pointer"
            onClick={() => handleResultClick(book)}
          >
            {/* <img
              src={book.image || "https://via.placeholder.com/150"}
              alt={book.title}
              className="w-full h-40 object-cover mb-2 rounded"
            /> */}
                <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden">
  <img
    src={book.image || 'https://via.placeholder.com/150'}
    alt={book.title || 'Book'}
    className="w-full h-full object-cover"
     loading="lazy"
  />
</div>
            <h2 className="text-lg font-semibold">{book.title.length > 40 ? book.title.substring(0,50)+'...' : book.title}</h2>
            <p className="text-sm text-gray-600">{book.authors}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}
