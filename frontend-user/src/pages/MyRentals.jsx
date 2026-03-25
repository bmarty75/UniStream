import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';

function MyRentals() {
  const { rentals } = useCart();

  const activeRentals = rentals.filter(r => new Date(r.expiryDate) > new Date());
  const expiredRentals = rentals.filter(r => new Date(r.expiryDate) <= new Date());

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Mes locations</h1>

        {activeRentals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Actives ({activeRentals.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {activeRentals.map(rental => (
                <div key={rental.id} className="group relative">
                  <Link to={`/movie/${rental.movieId}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${rental.poster}`}
                      alt={rental.title}
                      className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
                    />
                    <div className="mt-2">
                      <h3 className="font-semibold truncate">{rental.title}</h3>
                      <p className="text-sm text-green-400">
                        Expire dans {Math.ceil((new Date(rental.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} jour(s)
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {expiredRentals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-400">
              Expirées ({expiredRentals.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {expiredRentals.map(rental => (
                <div key={rental.id} className="opacity-50">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${rental.poster}`}
                    alt={rental.title}
                    className="w-full rounded-lg grayscale"
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold truncate">{rental.title}</h3>
                    <p className="text-sm text-red-400">Expiré</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {rentals.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <p className="text-2xl text-gray-400 mb-6">Aucune location pour le moment</p>
            <Link to="/">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition">
                Découvrir des films
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyRentals;