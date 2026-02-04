import Button from '../common/Button';

const MovieHero = ({ movie }) => {
  if (!movie) return null;
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">{movie.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">{movie.description}</p>
          <div className="flex gap-4">
            <Button size="lg">Lecture</Button>
            <Button variant="secondary" size="lg">Plus d'infos</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieHero;