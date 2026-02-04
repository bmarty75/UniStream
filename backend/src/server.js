import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors({
 origin: process.env.CLIENT_URL || 'http://localhost:3000',
 credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route de test
app.get('/api/health', (req, res) => {
 res.json({
 status: 'OK',
 message: 'API Netflix is running',
 timestamp: new Date().toISOString()
 });
});
// Démarrer le serveur
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
 console.log(`Environment: ${process.env.NODE_ENV}`);
});

app.get('/api/movies', (req, res) => {
 res.json({
 success: true,
 message: 'API Movies endpoint',
 data: [
 { id: 1, title: 'Inception', year: 2010 },
 { id: 2, title: 'The Dark Knight', year: 2008 }
 ]
 });
});