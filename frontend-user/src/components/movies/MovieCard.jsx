import Button from '../common/Button';

const MovieCard = ({ movie }) => (
  <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
    <div className="relative aspect-[2/3]">
      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
        <span className="text-yellow-400 font-bold text-sm">{movie.rating}</span>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{movie.description}</p>
      <Button size="sm" className="w-full">Louer {movie.price}€</Button>
    </div>
  </div>
);
export default MovieCard;