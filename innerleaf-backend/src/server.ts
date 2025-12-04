import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import routes
import authRoutes from './routes/authRoutes';
import plantRoutes from './routes/plantRoutes';
import habitRoutes from './routes/habitRoutes';
import questRoutes from './routes/questRoutes';
import challengeRoutes from './routes/challengeRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plant', plantRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/challenges', challengeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'InnerLeaf Backend API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innerleaf')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});