import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const mockBlogs = [
  {
    id: 1,
    title: 'Building Modern Full-Stack Web Apps with MERN',
    excerpt: 'Explore best practices for designing scalable REST APIs and responsive React user interfaces.',
    category: 'Development',
    author: 'Sandeha W.',
    date: 'Oct 07, 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS v4 in Modern Frontend Pipelines',
    excerpt: 'A comprehensive guide to leveraging the new performance upgrades in modern utility-first CSS.',
    category: 'Design & CSS',
    author: 'Codomax Intern',
    date: 'Oct 05, 2026',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Database Architecture Essentials: SQL vs NoSQL',
    excerpt: 'Key strategies for structuring document-oriented collections and optimizing query lookups.',
    category: 'Backend',
    author: 'Tech Lead',
    date: 'Sep 29, 2026',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Development', 'Design & CSS', 'Backend'];

  const filteredBlogs = selectedCategory === 'All'
    ? mockBlogs
    : mockBlogs.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Read, Write & Share <span className="text-indigo-600">Developer Stories</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A modern platform for engineers to document real-world architectural solutions and discoveries.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/create"
            className="bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Start Writing
          </Link>
        </div>
      </section>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md">
                  <Tag className="w-3 h-3" />
                  {blog.category}
                </span>
                <h2 className="mt-3 text-xl font-bold text-gray-900 line-clamp-1 hover:text-indigo-600 cursor-pointer">
                  {blog.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}