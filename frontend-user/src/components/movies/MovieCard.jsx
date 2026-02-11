import Button from '../common/Button';
import { useState} from 'react';
import MovieDescription from './MovieDescription';
const genreColors = {
  'Action': 'bg-red-500',
  'Comédie': 'bg-yellow-500',
  'Drame': 'bg-blue-500',
  'Science-Fiction': 'bg-purple-500',
  'Horreur': 'bg-orange-500',
  'Thriller': 'bg-gray-500'
};

function MovieCard({ movie }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleInfo = (e) => {
    e.stopPropagation(); // Empêche de déclencher d'autres clics sur la carte 
    setIsExpanded(!isExpanded);
  };

  const [likes, setLikes] = useState(movie.likes ||0)
  const [isLiked,setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes +1);
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
      
      {/* Image et Badges */}
      <div className="relative aspect-[2/3]">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-sm">⭐ {movie.rating}</span>
        </div>
        <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold text-white ${genreColors[movie.genre]}`}>
          {movie.genre}
        </div>
      </div>

      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

        <div className="mb-3">
          <button 
            onClick={handleLike}
            className={`px-3 py-1 rounded-full text-sm font-bold transition-colors flex items-center space-x-2 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-gray-500/80 text-gray-200'
            }`}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            <span>{likes} likes</span>
          </button>
        </div>

    
        <div className="flex items-center space-x-3 mb-3 text-sm">
          <span className="text-green-400 font-semibold">{movie.rating}/10</span>
          <span className="text-gray-400">{movie.year}</span>
          <span className="text-gray-400">{movie.duration}min</span>
        </div>

      
        <MovieDescription description={movie.description} isExpanded={isExpanded} />

        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" className="flex-1">▶ Louer {movie.price}€</Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={toggleInfo}
          >
            {isExpanded ? '- Info' : '+ Info'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;