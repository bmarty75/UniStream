import React from 'react';

function MovieFilter({ genres, selectedGenre, onGenreClick }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 px-4">
      <button
        onClick={() => onGenreClick('Tous')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
          selectedGenre === 'Tous' 
            ? 'bg-primary text-white' 
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
      >
        Tous
      </button>
      
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => onGenreClick(genre)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            selectedGenre === genre 
              ? 'bg-primary text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default MovieFilter;