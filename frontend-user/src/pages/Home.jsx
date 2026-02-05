import React from "react";
import Navbar from "../components/common/Navbar";
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import Footer from "../components/layout/Footer";
import moviesData from '../../../data/movies.json';

const popularMovies = [...moviesData]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
const featuredMovie = moviesData[0];

const genreMovies = moviesData
    .filter(movie => movie.genre == 'Action')
    .slice(0,5);
const recentMovies = moviesData.filter(movie => movie.year > 2010);

const Home = () => {
    return (
        <div className="bg-background min-h-screen text-white">
            <Navbar />
            <MovieHero movie={featuredMovie} />

            <main className="pb-12">
                <MovieList title='Film Populaire' movies={popularMovies} />
                <MovieList title='Action' movies={genreMovies} />
                <MovieList title="Films récents" movies={recentMovies} />
            </main>
            <Footer />
        </div>
    );
};

export default Home;    
