import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Image as ImageIcon } from 'lucide-react';

export default function CreateBlog() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    category: 'Development',
    coverImage: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Blog drafted successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
        <p className="text-sm text-gray-600 mt-1">Share your engineering thoughts with the world</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Article Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Modern Full-Stack API Architecture"
              value={blogData.title}
              onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={blogData.category}
                onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Development">Development</option>
                <option value="Design & CSS">Design & CSS</option>
                <option value="Backend">Backend</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
              <div className="mt-1 relative">
                <ImageIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={blogData.coverImage}
                  onChange={(e) => setBlogData({ ...blogData, coverImage: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Article Content (Markdown / Text)</label>
            <textarea
              required
              rows={8}
              placeholder="Write your article content here..."
              value={blogData.content}
              onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              <Send className="w-4 h-4" />
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}