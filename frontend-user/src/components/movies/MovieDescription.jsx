function MovieDescription({ description, isExpanded }) {
  return (
    <div className="mt-2">
      <p className={`text-sm text-gray-300 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {description}
      </p>
    </div>
  );
}

export default MovieDescription;