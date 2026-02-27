import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-9xl font-black text-[#22c55e] mb-4">404</h1>
      <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">
        Page introuvable
      </h2>
      <p className="text-gray-400 mb-8 max-w-md text-lg">
        Oups ! La page que vous recherchez n'existe pas...
      </p>
      <Link to="/">
        <Button size="lg" className="bg-[#22c55e] hover:bg-[#1ea34d]">
          Retour à l'accueil
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;