import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Data Store (Module 3 හිදී MongoDB වලට මාරු කෙරේ)
let users = [];
let blogs = [
  {
    id: 1,
    title: 'Building Modern Full-Stack Web Apps with MERN',
    excerpt: 'Explore best practices for designing scalable REST APIs and responsive React user interfaces.',
    category: 'Development',
    author: 'Sandeha W.',
    date: 'Oct 07, 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    content: 'Full-stack development allows engineers to control the end-to-end data lifecycle...'
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS v4 in Modern Frontend Pipelines',
    excerpt: 'A comprehensive guide to leveraging the new performance upgrades in modern utility-first CSS.',
    category: 'Design & CSS',
    author: 'Codomax Intern',
    date: 'Oct 05, 2026',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    content: 'The new engine delivers instant compilation and native CSS variable integration...'
  }
];

// --- 1. User Registration API ---
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User already exists.' });
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

// --- 2. User Login API ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  res.json({
    success: true,
    message: 'Login successful!',
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// --- 3. Get All Blogs API ---
app.get('/api/blogs', (req, res) => {
  res.json({ success: true, blogs });
});

// --- 4. Create Blog API ---
app.post('/api/blogs', (req, res) => {
  const { title, category, coverImage, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  }

  const newBlog = {
    id: Date.now(),
    title,
    excerpt: content.slice(0, 100) + '...',
    category: category || 'General',
    author: 'Author',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    content
  };

  blogs.unshift(newBlog);

  res.status(201).json({
    success: true,
    message: 'Blog created successfully!',
    blog: newBlog
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});