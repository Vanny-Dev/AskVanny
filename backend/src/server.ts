import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB once
let isConnected = false;
const ensureDbConnection = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Middleware to ensure DB connection for each request
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    next(error);
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Ask Vanny API is running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      messages: '/api/messages'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

export default app;