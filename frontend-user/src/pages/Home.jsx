import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieFilter from "../components/movies/MovieFilter";
import Footer from "../components/layout/Footer";
import moviesData from '../data/movies.json';

const Home = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState('Tous');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            setAllMovies(moviesData);
            setLoading(false);
        };
        loadMovies();
    }, []);

    const addToCart = (movie) => {
        if (!cart.find(m => m.id === movie.id)) {
            setCart([...cart, movie]);
        }
    };

    const removeFromCart = (movieId) => {
        setCart(cart.filter(m => m.id !== movieId));
    };

    const genres = [...new Set(allMovies.map(movie => movie.genre))];

    const filteredMovies = selectedGenre === 'Tous' 
        ? allMovies 
        : allMovies.filter(movie => movie.genre === selectedGenre);

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white font-bold">Chargement...</div>;
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar cart={cart} onRemove={removeFromCart} />
            
            {allMovies.length > 0 && <MovieHero movie={allMovies[0]} />}

            <main className="pb-12 pt-8">
                <MovieFilter 
                    genres={genres} 
                    selectedGenre={selectedGenre} 
                    onGenreClick={setSelectedGenre} 
                />

                <MovieList 
                    title={selectedGenre === 'Tous' ? 'Tous les films' : `Genre : ${selectedGenre}`} 
                    movies={filteredMovies} 
                    onRent={addToCart}
                    onRemove={removeFromCart}
                />
            </main>
            
            <Footer />
        </div>
    );
};

export default Home;