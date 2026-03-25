import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [rentals, setRentals] = useState([]);

  const addToCart = (movie) => {
    if (!cart.find(m => m.id === movie.id)) {
      setCart([...cart, movie]);
    }
  };

  const removeFromCart = (movieId) => setCart(cart.filter(m => m.id !== movieId));
  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.reduce((total, movie) => total + movie.price, 0);

  // Louer un seul film
  const rentMovie = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const newRental = {
      id: Date.now(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString()
    };

    setRentals([...rentals, newRental]);
    removeFromCart(movie.id);
    return { success: true, rental: newRental };
  };



  const isInCart = (movieId) => {
    return cart.some(m => m.id === movieId);
  };

  // Louer tous les films du panier d'un coup 
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

    setRentals([...rentals, ...newRentals]);
    clearCart();
    return { success: true, count: newRentals.length };
  };

  // On n'oublie pas de les exporter dans value ! [cite: 335-348]
  const value = { 
    cart, 
    rentals, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    getCartTotal, 
    rentMovie, 
    isInCart, 
    rentAllInCart 
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);