import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
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
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setApiError(result.error || 'Erreur de connexion');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <h1 className="text-red-600 font-black text-4xl tracking-tighter uppercase">UNIFLIX</h1>
      </div>
      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8">Se connecter</h2>

        {apiError && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4 text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-red-500`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              className={`w-full p-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-red-500`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition mt-4 disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm text-center">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-white hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;