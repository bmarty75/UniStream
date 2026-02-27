import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { NavLink, Link } from 'react-router-dom';

function Navbar({ cart = [], onRemove }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black to-transparent fixed w-full z-50">
      <Link to="/" className="text-[#22c55e] font-black text-3xl tracking-tighter cursor-pointer uppercase">
        UNIFLIX
      </Link>
      
      <div className="flex space-x-6 ml-10 flex-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? 'text-[#22c55e] font-bold' : 'text-gray-300 hover:text-white transition-colors'
          }
        >
          Accueil
        </NavLink>
        <NavLink 
          to="/my-rentals" 
          className={({ isActive }) => 
            isActive ? 'text-[#22c55e] font-bold' : 'text-gray-300 hover:text-white transition-colors'
          }
        >
          Mes locations
        </NavLink>
      </div>

      <div className="flex items-center space-x-6">
        <SearchBar />
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#22c55e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cart.length}
              </span>
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-800 font-bold text-sm text-white">Mon Panier</div>
              <div className="max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">Votre panier est vide</div>
                ) : (
                  cart.map((movie) => (
                    <div key={movie.id} onDoubleClick={() => onRemove(movie.id)} className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-none">
                      <img src={`https://image.tmdb.org/t/p/w92${movie.poster}`} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{movie.title}</div>
                        <div className="text-xs text-gray-400">{movie.price}€</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <Link to="/login" className="bg-[#22c55e] hover:bg-[#1ea34d] text-white px-4 py-1.5 rounded font-bold text-sm transition-colors">
          Connexion
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;