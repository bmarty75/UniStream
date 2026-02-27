import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import MovieCard from '../components/movies/MovieCard';

function MyRentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const savedRentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    setRentals(savedRentals);
  }, []);

  const removeRental = (movieId) => {
    const updatedRentals = rentals.filter(m => m.id !== movieId);
    setRentals(updatedRentals);
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar cart={[]} onRemove={() => {}} />
      
      <main className="pt-24 px-8 pb-12">
        <h1 className="text-4xl font-bold mb-8">Mes locations</h1>

        {rentals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-400 mb-8 text-xl">Aucune location pour le moment</p>
            <Link 
              to="/" 
              className="bg-[#22c55e] hover:bg-[#1ea34d] text-white px-8 py-3 rounded-md font-bold transition-colors"
            >
              Découvrir des films
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {rentals.map(movie => (
              <div key={movie.id} className="relative">
                <MovieCard 
                  movie={movie} 
                  onRent={() => {}} 
                  onRemove={removeRental} 
                />
                <div className="mt-2 text-[10px] text-gray-500 uppercase tracking-wider">
                  Expire le : {new Date(movie.expiryDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyRentals;