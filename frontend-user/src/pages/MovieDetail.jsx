import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';
import moviesData from '../data/movies.json';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart, rentMovie, isRented, getRentalByMovieId } = useCart();

  useEffect(() => {
    const foundMovie = moviesData.find(m => m.id.toString() === id);
    setMovie(foundMovie);
    setLoading(false);
  }, [id]);

  const showNotif = (message, type = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRent = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    rentMovie(movie);
    showNotif('Film loué avec succès !');
    setTimeout(() => navigate('/my-rentals'), 2000);
  };

  const handleAddToCart = () => {
    if (isInCart(movie.id)) return;
    addToCart(movie);
    showNotif('Film ajouté au panier !');
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Chargement...
    </div>
  );

  if (!movie) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl mb-4">Film introuvable</h1>
      <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
    </div>
  );

  const rental = getRentalByMovieId(movie.id);
  const alreadyRented = isRented(movie.id);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {notification && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 text-white font-semibold
          ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="relative h-[85vh] w-full">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop || movie.poster}`}
            alt=""
            className="w-full h-full object-cover opacity-50 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </div>

        <div className="absolute top-24 left-8 z-10">
          <Breadcrumb items={[
            { label: 'Films', path: '/' },
            { label: movie.genre },
            { label: movie.title }
          ]} />
        </div>

        <div className="absolute bottom-0 left-0 p-12 w-full flex flex-col md:flex-row gap-10 items-end">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            alt={movie.title}
            className="w-72 rounded-lg shadow-2xl hidden md:block border border-white/10"
          />

          <div className="flex-1 pb-4">
            <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">
              {movie.title}
            </h1>
            <div className="flex items-center space-x-4 mb-6 text-xl">
              <span className="text-green-400 font-bold">{movie.rating}/10</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="text-gray-400">{movie.duration} min</span>
              <span className="border border-gray-600 px-3 py-1 text-xs rounded-full uppercase">
                {movie.genre}
              </span>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mb-10 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {alreadyRented ? (
                <div className="px-8 py-4 bg-green-700 rounded-lg text-white font-bold text-lg">
                  Film loué jusqu'au {new Date(rental.expiryDate).toLocaleDateString('fr-FR')}
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={handleRent}
                  className="bg-green-600 hover:bg-green-700 px-12 py-4 text-xl"
                >
                  Louer maintenant - {movie.price}€
                </Button>
              )}

              {!alreadyRented && (
                isInCart(movie.id) ? (
                  <Button
                    size="lg"
                    className="bg-gray-600 cursor-not-allowed px-12 py-4 text-xl"
                    disabled
                  >
                    Dans le panier
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="bg-gray-800 border border-gray-600 hover:bg-gray-700 px-12 py-4 text-xl"
                  >
                    + Ajouter au panier
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;