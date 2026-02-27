import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';
import moviesData from '../data/movies.json';

function MovieDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const findMovie = () => {
      setLoading(true);
      const foundMovie = moviesData.find(m => m.id.toString() === id);
      setMovie(foundMovie);
      setLoading(false);
    };
    findMovie();
  }, [id]);

  const handleRent = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const rentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    const alreadyRented = rentals.some(r => r.id === movie.id);

    if (alreadyRented) {
      setNotification({ type: 'error', message: 'Vous avez déjà loué ce film' });
      return;
    }
    const newRental = {
      ...movie,
      rentalDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    localStorage.setItem('rentals', JSON.stringify([...rentals, newRental]));
    setNotification({ type: 'success', message: 'Film loué avec succès !' });

    setTimeout(() => navigate('/my-rentals'), 2000);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Chargement...</div>;
  if (!movie) return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h1>Film introuvable</h1><Button onClick={() => navigate('/')}>Retour à l'accueil</Button></div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar cart={[]} onRemove={() => {}} />

      {notification && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="relative h-[75vh] w-full">
        <div className="absolute inset-0">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster}`} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="absolute top-24 left-8 z-10">
          <Breadcrumb items={[{ label: 'Films', path: '/' }, { label: movie.genre }, { label: movie.title }]} />
        </div>

        <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row gap-8 items-end">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title} className="w-64 rounded-lg shadow-2xl hidden md:block" />
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-4 uppercase">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-6 text-lg">
              <span className="text-[#22c55e] font-bold">{movie.rating}/10</span>
              <span className="text-gray-400">{movie.year}</span> {/*  */}
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mb-8">Synopsis : {movie.description}</p>
            <Button size="lg" onClick={handleRent} className="bg-[#22c55e] hover:bg-[#1ea34d]">
              Louer pour {movie.price}€
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetail;