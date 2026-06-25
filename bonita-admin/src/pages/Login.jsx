import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please fill in all fields.');
    }
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-premium border-t-4 border-primary">
        
        {/* Header Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-serif tracking-wide text-primary font-bold">Bonita Ropita</span>
          <span className="text-[10px] tracking-widest text-accent uppercase font-semibold block -mt-1">Staff Admin Panel</span>
          <h2 className="text-xl font-serif text-neutral-800 mt-4">Sign In to Dashboard</h2>
        </div>

        {/* Errors display panel */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r flex gap-3 text-red-700 text-sm items-start">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-600 block mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-neutral-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bonitashop.com"
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-neutral-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-600 block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-neutral-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-neutral-50"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded text-sm uppercase tracking-wider font-semibold shadow hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-400 leading-relaxed">
          <p>This is a private administration panel. Unauthorized access attempt is strictly prohibited.</p>
          <p className="mt-2 text-primary font-medium">Offline Testing User: admin@bonitashop.com / password123</p>
        </div>

      </div>
    </div>
  );
}
