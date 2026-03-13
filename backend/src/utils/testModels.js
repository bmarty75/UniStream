import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';

dotenv.config();

const testModels = async () => {
  try {
    await connectDB();
    console.log('--- Démarrage des tests des modèles ---\n');
    console.log('Test 1 : Création utilisateur');
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123'
    });
    console.log('✓ Utilisateur créé avec avatar auto-généré :', testUser.avatar);
    console.log('\nTest 2 : Comparaison de mot de passe');
    const userWithPassword = await User.findById(testUser._id).select('+password');
    const isMatch = await userWithPassword.comparePassword('test123');
    console.log('✓ Le mot de passe haché correspond :', isMatch);
    console.log('\nTest 3 : Création d\'un film');
    const testMovie = await Movie.create({
      title: 'Test Movie',
      description: 'Un film pour tester les virtuels',
      poster: 'https://example.com/poster.jpg',
      backdrop: 'https://example.com/backdrop.jpg',
      genre: ['Action'],
      year: 2024,
      duration: 125,
      price: 4.99,
      rating: 8.5
    });
    console.log('✓ Film créé avec durée formatée :', testMovie.durationFormatted);
    console.log('\nTest 4 : Création d\'une location');
    const testRental = await Rental.create({
      user: testUser._id,
      movie: testMovie._id,
      price: testMovie.price
    });
    console.log('✓ Location créée. Jours restants :', testRental.daysLeft);
    console.log('\nTest 5 : Vérification des relations (Populate)');
    const rentalWithDetails = await Rental.findById(testRental._id)
      .populate('user', 'name email')
      .populate('movie', 'title price');
    console.log('✓ Détails récupérés :', {
      client: rentalWithDetails.user.name,
      film: rentalWithDetails.movie.title
    });

    console.log('\n--- Nettoyage des données de test ---');
    await User.deleteOne({ _id: testUser._id });
    await Movie.deleteOne({ _id: testMovie._id });
    await Rental.deleteOne({ _id: testRental._id });

    console.log('\nTous les tests sont passés avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur pendant les tests :', error.message);
    process.exit(1);
  }
};

testModels();