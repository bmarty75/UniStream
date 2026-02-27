import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function MovieHero({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop || movie.poster}`} 
          alt={movie.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-12 max-w-3xl space-y-6">
        <h1 className="text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
          {movie.title}
        </h1>
        
        <div className="flex items-center space-x-4 text-lg">
          <span className="text-[#22c55e] font-bold">{movie.rating}/10</span>
          <span className="text-white">{movie.year}</span>
          <span className="bg-gray-800/80 text-white px-3 py-1 text-xs rounded-full border border-gray-700">
            {movie.genre}
          </span>
        </div>

        <p className="text-gray-200 text-xl line-clamp-3 max-w-xl leading-relaxed drop-shadow-md">
          {movie.description}
        </p>

        <div className="flex space-x-4 pt-4">
          <Button size="lg" className="bg-white !text-black hover:bg-gray-200 flex items-center gap-2">
            <span className="text-2xl">▶</span> Lecture
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex items-center gap-2 border-white/40 hover:bg-white/10"
          >
            <span className="text-xl">ⓘ</span> Plus d'infos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieHero;