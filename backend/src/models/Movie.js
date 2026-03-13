import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
      maxlength: [2000, "La description ne peut pas dépasser 2000 caractères"],
    },
    poster: {
      type: String,
      required: [true, "L'affiche est requise"],
      validate: {
        validator: function (v) { return /^https?:\/\/.+/.test(v); },
        message: "L'URL de l'affiche doit être valide",
      },
    },
    backdrop: {
      type: String,
      required: [true, "L'image de fond est requise"],
      validate: {
        validator: function (v) { return /^https?:\/\/.+/.test(v); },
        message: "L'URL de l'image de fond doit être valide",
      },
    },
    genre: {
      type: [String],
      required: [true, "Le genre est requis"],
      validate: {
        validator: function (v) { return v && v.length > 0; },
        message: "La liste des genres ne peut pas être vide.",
      },
      enum: {
        values: ["Action", "Comédie", "Drame", "Science-Fiction", "Horreur", "Thriller", "Romance", "Animation", "Documentaire"],
        message: "{VALUE} n'est pas un genre valide",
      },
    },
    year: {
      type: Number,
      required: [true, "L'année est requise"],
      min: [1900, "L'année doit être supérieure à 1900"],
      max: [new Date().getFullYear() + 2, "L'année est invalide"],
    },
    duration: {
      type: Number,
      required: [true, "La durée est requise"],
      min: [1, "La durée doit être positive"],
    },
    price: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: [0, "Le prix doit être positif"],
      default: 3.99,
    },
    rating: {
      type: Number,
      min: [0, "Note entre 0 et 10"],
      max: [10, "Note entre 0 et 10"],
      default: 0,
    },
    isAvailable: { type: Boolean, default: true },
    rentalCount: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

movieSchema.index({ title: "text", description: "text" });
movieSchema.index({ genre: 1 });
movieSchema.index({ year: -1 });

movieSchema.virtual("durationFormatted").get(function () {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  return `${hours}h${minutes > 0 ? minutes + 'min' : ''}`;
});

movieSchema.statics.getRecentMovies = function (limit = 10) {
  return this.find({ isAvailable: true }).sort({ year: -1 }).limit(limit);
};

movieSchema.statics.search = function (query) {
  return this.find({ $text: { $search: query }, isAvailable: true }).sort({ score: { $meta: "textScore" } });
};

movieSchema.methods.incrementRentalCount = async function () {
  this.rentalCount += 1;
  return await this.save();
};
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;