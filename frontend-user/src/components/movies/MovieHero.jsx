import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function MovieHero({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster}`} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>
      <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl space-y-4">
        <h1 className="text-6xl font-black uppercase tracking-tighter text-white">{movie.title}</h1>
        <div className="flex items-center space-x-4 text-lg text-gray-200">
          <span className="text-[#22c55e] font-bold">{movie.rating}/10</span>
          <span>{movie.year}</span>
          <span className="border border-gray-400 px-2 py-0.5 text-sm rounded">{movie.genre}</span>
        </div>
        <p className="text-gray-300 text-lg line-clamp-3 italic">{movie.description}</p>
        <div className="flex space-x-4 pt-4">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">▶ Lecture</Button>
          <Button variant="outline" size="lg" onClick={() => navigate(`/movie/${movie.id}`)}>ⓘ Plus d'infos</Button>
        </div>
      </div>
    </div>
  );
}

export default MovieHero;