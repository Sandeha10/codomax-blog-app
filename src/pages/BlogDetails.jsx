import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlog(data.blog);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading blog details...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Article not found</h2>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md">
            <Tag className="w-3 h-3" /> {blog.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {blog.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover rounded-xl my-6" />
          )}

          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-base">
            {blog.content}
          </div>
        </div>
      </div>
    </article>
  );
}