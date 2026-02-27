import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ title, movies, onRent, onRemove }) {
  return (
    <div className="px-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onRent={onRent} 
            onRemove={onRemove} 
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;