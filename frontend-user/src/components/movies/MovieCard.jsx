import React, { useState } from 'react';
import Button from '../common/Button';
import MovieDescription from './MovieDescription';

function MovieCard({ movie, onRent, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(movie.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div 
      onDoubleClick={() => onRemove(movie.id)}
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-[2/3]">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster}`} 
          alt={movie.title} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

        <div className="mb-3">
          <button onClick={handleLike} className="text-sm text-gray-200">
            {isLiked ? '❤️' : '🤍'} {likes} likes
          </button>
        </div>

        <MovieDescription description={movie.description} isExpanded={isExpanded} />

        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
                e.stopPropagation();
                onRent(movie);
            }}
          >
            ▶ Louer {movie.price}€
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? '- Info' : '+ Info'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;