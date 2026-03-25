import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import MovieDescription from './MovieDescription';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function MovieCard({ movie, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(movie.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { rentMovie, isRented } = useCart();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const toggleInfo = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleRent = (e) => {
    e.stopPropagation();
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    rentMovie(movie);
    navigate('/my-rentals');
  };

  return (
    <div
      onClick={handleCardClick}
      onDoubleClick={() => onRemove && onRemove(movie.id)}
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
        <h3 className="text-xl font-bold mb-2 text-white">{movie.title}</h3>
        <div className="mb-3">
          <button onClick={handleLike} className="text-sm text-gray-200">
            {isLiked ? '💚' : '🤍'} {likes} likes
          </button>
        </div>
        <MovieDescription description={movie.description} isExpanded={isExpanded} />
        <div className="flex gap-2 mt-4">
          {isRented(movie.id) ? (
            <Button size="sm" className="flex-1 bg-green-700 cursor-not-allowed" disabled>
              Deja loue
            </Button>
          ) : (
            <Button size="sm" className="flex-1" onClick={handleRent}>
              Louer {movie.price}€
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={toggleInfo}>
            {isExpanded ? '- Info' : '+ Info'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;