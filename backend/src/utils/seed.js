import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const moviesPath = join(__dirname, '../../../data/movies.json');
const moviesData = JSON.parse(readFileSync(moviesPath, 'utf-8'));

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Nettoyage de la base de données...');
    
    await User.deleteMany({});
    await Movie.deleteMany({});
    await Rental.deleteMany({});
    
    console.log('Base de données nettoyée');

    console.log('Création de l\'utilisateur admin...');
    const admin = await User.create({
      name: 'Admin Netflix',
      email: 'admin@netflix.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Création des utilisateurs de test...');
    const users = await User.create([
      { name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { name: 'Bob Martin', email: 'bob@example.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
    ]);

    console.log('Insertion des films...');
    const movies = await Movie.insertMany(moviesData);
    console.log(`${movies.length} films insérés`);

    console.log('Création de locations de test...');
    const rentals = await Rental.create([
      {
        user: users[0]._id,
        movie: movies[0]._id,
        price: movies[0].price,
        rentalDate: new Date(),
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[1]._id,
        movie: movies[2]._id,
        price: movies[2].price,
        rentalDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'expired'
      }
    ]);

    await movies[0].incrementRentalCount();
    await movies[2].incrementRentalCount();

    console.log('\nBase de données initialisée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error(`Erreur lors du seed : ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();