import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


function Cart() {
  const { cart, clearCart, getCartTotal, rentAllInCart } = useCart();

  const handleRentAll = () => {
    
    const result = rentAllInCart();
    if (result.success) {
      alert(`${result.count} film(s) loué(s) avec succès!`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-6">Votre panier est vide</p>
            <Link to="/">
                <button className="px-4 py-2 bg-red-600 text-white rounded">Découvrir les films</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                {cart.map(movie => (
                    <div key={movie.id} className="flex items-center bg-gray-900 rounded-lg p-4 border border-gray-800">
                        <img src={movie.poster} alt={movie.title} className="w-20 h-28 object-cover rounded" />
                        <div className="flex-1 ml-4">
                            <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">{movie.year} • {movie.genre}</p>
                            <p className="text-red-500 font-bold text-lg">{movie.price}€</p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-24">
                    <h2 className="text-2xl font-bold mb-6">Résumé</h2>
                    <div className="flex justify-between text-2xl font-bold mb-6">
                        <span>Total:</span>
                        <span className="text-red-500">{getCartTotal().toFixed(2)}€</span>
                    </div>
                    <button onClick={handleRentAll} className="w-full mb-3 px-4 py-2 bg-red-600 text-white rounded">
                        Louer tout ({cart.length} films)
                    </button>
                    <button onClick={clearCart} className="w-full px-4 py-2 border border-gray-700 rounded text-gray-300">
                        Vider le panier
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;