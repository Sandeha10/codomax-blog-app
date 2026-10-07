import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-lg mb-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>DevBlog</span>
        </div>
        <p className="text-sm">codomax - blog - app -2026</p>
      </div>
    </footer>
  );
}