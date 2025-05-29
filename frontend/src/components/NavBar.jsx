import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">ToDo App</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout} className="underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="underline">Login</Link>
            <Link to="/register" className="underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
