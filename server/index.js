import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Blog from './models/Blog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codomax-blog';
const JWT_SECRET = process.env.JWT_SECRET || 'codomax_secret_key_2026';

// --- Production CORS Configuration ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('DevBlog Backend API is running successfully!');
});

// --- JWT Auth Middleware ---
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

// --- 1. Register with JWT ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 2. Login with JWT ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 3. Get All Public Blogs ---
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 4. Get Logged-In User's Blogs (Protected) ---
app.get('/api/blogs/user/me', verifyToken, async (req, res) => {
  try {
    const userBlogs = await Blog.find({ authorId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, blogs: userBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 5. Get Single Blog by ID ---
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid Blog ID' });
  }
});

// --- 6. Create Blog (Protected) ---
app.post('/api/blogs', verifyToken, async (req, res) => {
  try {
    const { title, category, coverImage, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const newBlog = await Blog.create({
      title,
      excerpt: content.slice(0, 120) + '...',
      category: category || 'General',
      author: req.user.name,
      authorId: req.user.id,
      image: coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      content
    });

    res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 7. Update Blog (Protected) ---
app.put('/api/blogs/:id', verifyToken, async (req, res) => {
  try {
    const { title, category, coverImage, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.authorId && blog.authorId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to edit this post' });
    }

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    if (coverImage) blog.image = coverImage;
    if (content) {
      blog.content = content;
      blog.excerpt = content.slice(0, 120) + '...';
    }

    await blog.save();
    res.json({ success: true, message: 'Blog updated successfully!', blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 8. Delete Blog (Protected) ---
app.delete('/api/blogs/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.authorId && blog.authorId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this post' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});