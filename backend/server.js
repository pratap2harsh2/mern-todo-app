// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// API routes
app.use('/api/todos', todoRoutes);

// ✅ Serve frontend build (for production)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
app.listen(port, () => {
connectDB();
console.log(`Server running on port ${port}`);
});
