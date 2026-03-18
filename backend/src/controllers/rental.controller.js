import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
export const createRental = async (req, res, next) => {
  try {
    const { movieId, userId } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ success: false, message: "Film non trouvé" });

    const rental = await Rental.create({
      user: userId,
      movie: movieId,
      price: movie.price
    });

    await movie.incrementRentalCount();
    res.status(201).json({ success: true, data: rental });
  } catch (error) { next(error); }
};

export const getMyRentals = async (req, res, next) => {
  try {
    const { userId } = req.query; 
    const rentals = await Rental.find({ user: userId }).populate('movie');
    res.status(200).json({ success: true, data: rentals });
  } catch (error) { next(error); }
};


export const getAllRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find()
      .populate('user', 'name email')
      .populate('movie', 'title');
    res.status(200).json({ success: true, count: rentals.length, data: rentals });
  } catch (error) { next(error); }
};