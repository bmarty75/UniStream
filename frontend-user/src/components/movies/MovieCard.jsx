import Button from '../common/Button';

function MovieCard({ movie }) {
  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
      
      {/* Image principale */}
      <div className="relative aspect-[2/3]">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover" 
        />

        {/* Badge de note */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-sm">
            ⭐ {movie.rating}
          </span>
        </div>
      </div>

      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

        <div className="flex items-center space-x-3 mb-3 text-sm">
          <span className="text-green-400 font-semibold">{movie.rating}/10</span>
          <span className="text-gray-400">{movie.year}</span>
          <span className="text-gray-400">{movie.duration}min</span>
        </div>

        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {movie.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" className="flex-1">
            ▶ Louer {movie.price}€
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            + Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;