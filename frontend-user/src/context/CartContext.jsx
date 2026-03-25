import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [rentals, setRentals] = useState([]);

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRentals = localStorage.getItem('rentals');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedRentals) setRentals(JSON.parse(savedRentals));
  }, []);

  // Sauvegarder à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rentals', JSON.stringify(rentals));
  }, [rentals]);

  const addToCart = (movie) => {
    if (!cart.find(m => m.id === movie.id)) {
      setCart(prev => [...prev, movie]);
    }
  };

  const removeFromCart = (movieId) => {
    setCart(prev => prev.filter(m => m.id !== movieId));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((total, movie) => total + movie.price, 0);

  const getCartCount = () => cart.length;

  const rentMovie = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const rental = {
      id: Date.now(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString()
    };

    setRentals(prev => [...prev, rental]);
    removeFromCart(movie.id);
    return { success: true, rental };
  };

  const rentAllInCart = () => {
    const newRentals = cart.map(movie => {
      const rentalDate = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      return {
        id: Date.now() + Math.random(),
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster,
        price: movie.price,
        rentalDate: rentalDate.toISOString(),
        expiryDate: expiryDate.toISOString()
      };
    });

    setRentals(prev => [...prev, ...newRentals]);
    clearCart();
    return { success: true, count: newRentals.length };
  };

  const isRented = (movieId) => rentals.some(r => r.movieId === movieId);

  const getRentalByMovieId = (movieId) => rentals.find(r => r.movieId === movieId);

  const isInCart = (movieId) => cart.some(m => m.id === movieId);

  const value = {
    cart, rentals,
    addToCart, removeFromCart, clearCart,
    getCartTotal, getCartCount,
    rentMovie, rentAllInCart,
    isRented, getRentalByMovieId, isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}