import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/database.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get('/', (req, res) => {
  res.json({
    message: 'Netflix API',
    version: '1.0.0',
    endpoints: { health: '/api/health', movies: '/api/movies' }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API Netflix is running',
    timestamp: new Date().toISOString(),
    // Vérifie l'état réel de la connexion Mongoose
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/movies', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Inception', year: 2010 },
      { id: 2, title: 'The Dark Knight', year: 2008 }
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Waiting...'}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});