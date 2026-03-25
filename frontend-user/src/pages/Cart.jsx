import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const { cart, removeFromCart, clearCart, getCartTotal, rentAllInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRentAll = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    const result = rentAllInCart();
    if (result.success) {
      alert(`${result.count} film(s) loué(s) avec succès !`);
      navigate('/my-rentals');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>
          <svg className="w-24 h-24 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-2xl text-gray-400 mb-6">Votre panier est vide</p>
          <Link to="/">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition">
              Découvrir des films
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des films */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(movie => (
              <div key={movie.id} className="flex items-center bg-gray-900 rounded-lg p-4 border border-gray-800">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/80x112?text=No+Image'; }}
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {movie.year} • {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} • {movie.duration}min
                  </p>
                  <p className="text-red-500 font-bold text-lg">{movie.price?.toFixed(2)}€</p>
                </div>
                <button
                  onClick={() => removeFromCart(movie.id)}
                  className="text-red-400 hover:text-red-300 transition ml-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Résumé */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Résumé</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Nombre de films:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Durée de location:</span>
                <span>7 jours</span>
              </div>
              <hr className="border-gray-800" />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total:</span>
                <span className="text-red-500">{getCartTotal().toFixed(2)}€</span>
              </div>
            </div>
            <button
              onClick={handleRentAll}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition mb-3"
            >
              Louer tout ({cart.length} film{cart.length > 1 ? 's' : ''})
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 border border-gray-700 rounded hover:bg-gray-800 transition text-white"
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;