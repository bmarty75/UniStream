import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';

function MyRentals() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar cart={[]} onRemove={() => {}} />
      
      <main className="pt-24 px-8 pb-12">
        <h1 className="text-4xl font-bold mb-8 uppercase tracking-tighter">Mes locations</h1>

        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500 mb-8 text-xl">Votre liste de locations est vide</p>
          <Link 
            to="/" 
            className="bg-[#22c55e] hover:bg-[#1ea34d] text-white px-10 py-3 rounded-md font-bold transition-all"
          >
            Découvrir des films
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyRentals;