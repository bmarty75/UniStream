import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        })
      );
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <h1 className="text-[#22c55e] font-black text-4xl tracking-tighter uppercase">UNIFLIX</h1>
      </div>

      <div className="bg-gray-900/50 p-8 md:p-16 rounded-lg border border-gray-800 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8">S'inscrire</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nom"
              className={`w-full p-3 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-[#22c55e]`}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-[#22c55e]`}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              className={`w-full p-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-[#22c55e]`}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              className={`w-full p-3 bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-[#22c55e]`}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#22c55e] hover:bg-[#1ea34d] py-3 mt-4"
            disabled={loading}
          >
            {loading ? 'Inscription...' : "S'inscrire"}
          </Button>
        </form>

        <div className="mt-8 text-gray-500 text-sm">
          Déjà un compte ? <Link to="/login" className="text-white hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;