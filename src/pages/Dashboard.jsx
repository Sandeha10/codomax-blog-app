import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, Trash2, Eye, Heart, Plus } from 'lucide-react';

export default function Dashboard() {
  const userBlogs = [
    { id: 1, title: 'Building Modern Full-Stack Web Apps with MERN', date: 'Oct 07, 2026', views: 320, likes: 24 },
    { id: 2, title: 'Mastering Tailwind CSS v4 in Modern Frontend Pipelines', date: 'Oct 05, 2026', views: 185, likes: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your published articles and view analytics</p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            New Blog Post
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Posts</span>
            <p className="text-3xl font-extrabold text-gray-900 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Readers</span>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">505</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Reactions</span>
            <p className="text-3xl font-extrabold text-emerald-600 mt-2">36</p>
          </div>
        </div>

        {/* Table of Blogs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Your Articles</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {userBlogs.map((blog) => (
              <div key={blog.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition">
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{blog.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span>Published on {blog.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {blog.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {blog.likes}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100">
                    <PenSquare className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}