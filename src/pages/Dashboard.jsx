import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenSquare, Trash2, Plus, Calendar, Tag } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await fetch('http://localhost:5000/api/blogs/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (data.success) {
          alert('Article deleted successfully!');
          setBlogs(blogs.filter((b) => b._id !== id));
        } else {
          alert(data.message || 'Failed to delete');
        }
      } catch (err) {
        console.error(err);
        alert('Server error while deleting article');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage, update, and remove your published blogs</p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            New Blog Post
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Articles</span>
            <p className="text-3xl font-extrabold text-gray-900 mt-2">{blogs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Database Status</span>
            <p className="text-3xl font-extrabold text-emerald-600 mt-2">MongoDB Active</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Your Articles (Personal Feed)</h3>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading articles from MongoDB...</div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">You haven't published any articles yet. Create your first post!</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {blogs.map((blog) => (
                <div key={blog._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{blog.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/edit/${blog._id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 transition"
                    >
                      <PenSquare className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}