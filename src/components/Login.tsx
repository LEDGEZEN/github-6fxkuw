import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const { login, logout, isAuthenticated } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center">
        <span className="mr-2">Authenticated</span>
        <button
          onClick={logout}
          className="bg-red-600 text-gray-100 px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="px-4 py-2 rounded-l-md focus:outline-none bg-gray-700 text-gray-100"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-gray-100 px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300 flex items-center"
      >
        <Lock className="mr-2" /> Login
      </button>
    </form>
  );
};

export default Login;