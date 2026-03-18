import Movie from '../models/Movie.js';


export const getAllMovies = async (req, res, next) => {
  try {
    const { search, genre, year, sort, page = 1, limit = 10 } = req.query;
    let query = { isAvailable: true };

    if (search) query.$text = { $search: search };
    if (genre) query.genre = genre;
    if (year) query.year = year;

    const sortOption = sort === 'rating' ? { rating: -1 } : { createdAt: -1 };
    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Movie.countDocuments(query);

    res.status(200).json({
      success: true,
      count: movies.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: movies
    });
  } catch (error) { next(error); }
};

export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });
    res.status(200).json({ success: true, data: movie });
  } catch (error) { next(error); }
};

export const getMovieStats = async (req, res, next) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { isAvailable: true } },
      { $group: {
          _id: null,
          totalMovies: { $sum: 1 },
          estimatedRevenue: { $sum: { $multiply: ['$price', '$rentalCount'] } }
      }}
    ]);
    res.status(200).json({ success: true, data: stats[0] });
  } catch (error) { next(error); }
};

export const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) { next(error); }
};

export const updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: movie });
  } catch (error) { next(error); }
};

export const deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Film supprimé" });
  } catch (error) { next(error); }
};