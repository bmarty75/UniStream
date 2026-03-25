import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.email) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
    const result = await register(formData.name, formData.email, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setApiError(result.error || "Erreur d'inscription");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <h1 className="text-green-600 font-black text-4xl tracking-tighter uppercase">UNIFLIX</h1>
      </div>
      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8">S'inscrire</h2>

        {apiError && (
          <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded mb-4 text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nom"
              className={`w-full p-3 bg-gray-800 border ${errors.name ? 'border-green-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-green-500`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-green-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 bg-gray-800 border ${errors.email ? 'border-green-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-green-500`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-green-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              className={`w-full p-3 bg-gray-800 border ${errors.password ? 'border-green-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-green-500`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-green-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className={`w-full p-3 bg-gray-800 border ${errors.confirmPassword ? 'border-green-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-green-500`}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <p className="text-green-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition mt-4 disabled:opacity-50"
          >
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm text-center">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-white hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;