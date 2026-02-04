import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route de test
app.get('/', (req, res) => {res.render('index', { title: 'Admin Netflix' });
});
app.listen(PORT, () => {
 console.log(`Admin panel running on http://localhost:${PORT}`);
});