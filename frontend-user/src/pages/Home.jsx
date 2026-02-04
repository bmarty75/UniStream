import React from 'react';
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieCard from '../components/movies/MovieCard';
import Footer from '../components/layout/Footer';
import moviesData from '../../../data/movies.json'; // Vérifie bien le chemin

const Home = () => {
  const featuredMovie = moviesData[0]; // On prend le 1er film pour le Hero [cite: 1537]

  return (
    <div className="bg-background min-h-screen text-white">
      <Navbar />
      <MovieHero movie={featuredMovie} />
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Films populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moviesData.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
export default Home;