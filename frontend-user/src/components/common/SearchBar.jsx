import React, { useState, useEffect } from 'react';
import moviesData from '../../data/movies.json';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const results = moviesData
        .filter(movie => 
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <div className="flex items-center space-x-2 relative">
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) {
            setSearchTerm('');
            setSuggestions([]);
          }
        }}
        className="hover:text-gray-300 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="relative">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un film..."
            className="w-64 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
            autoFocus
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
              {suggestions.map((movie) => (
                <div 
                  key={movie.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-none"
                  onClick={() => {
                    setSearchTerm(movie.title);
                    setSuggestions([]);
                  }}
                >
                  <img 
                    src={`https://image.tmdb.org/t/p/w92${movie.poster}`} 
                    alt={movie.title} 
                    className="w-10 h-14 object-cover rounded shadow-md"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/92x138?text=X"; }}
                  />
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">{movie.title}</div>
                    <div className="text-xs text-gray-400">{movie.year} • {movie.genre}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;