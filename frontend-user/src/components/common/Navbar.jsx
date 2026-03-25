import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import SearchBar from './SearchBar';

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black to-transparent fixed w-full z-50">
      <Link to="/" className="text-red-600 font-black text-3xl tracking-tighter cursor-pointer uppercase">
        UNIFLIX
      </Link>

      <div className="flex space-x-6 ml-10 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white transition-colors'
          }
        >
          Accueil
        </NavLink>
        <NavLink
          to="/my-rentals"
          className={({ isActive }) =>
            isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white transition-colors'
          }
        >
          Mes locations
        </NavLink>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar />

        {/* Bouton Panier */}
        <Link to="/cart" className="relative p-1 text-white hover:text-gray-300 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* User ou Connexion */}
        {isAuthenticated() ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-red-500 transition"
              />
              <span className="hidden md:block text-sm text-white">{user.name}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl py-2 z-50">
                <NavLink
                  to="/my-rentals"
                  className="block px-4 py-2 hover:bg-gray-800 transition text-white text-sm"
                  onClick={() => setShowUserMenu(false)}
                >
                  Mes locations
                </NavLink>
                <hr className="border-gray-800 my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-red-400 text-sm"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm font-bold">
              Connexion
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;