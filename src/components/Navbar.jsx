import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, LogOut, User, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    setToken(savedToken);
    if (savedUser && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser({});
      }
    } else {
      setUser({});
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser({});
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-extrabold text-xl tracking-tight">
          <BookOpen className="w-6 h-6" />
          <span>DevBlog</span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
            Home
          </Link>

          {token ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/create" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-semibold">
                <PlusCircle className="w-4 h-4" /> Create
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5" />
                  {user.name || 'Author'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-1.5">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-indigo-700 transition">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}