import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String, default: 'General' },
  author: { type: String, default: 'Sandeha W.' },
  image: { type: String },
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);