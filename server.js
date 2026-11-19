
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Cache the MongoDB connection promise
let dbConnectionPromise;

const ensureDB = async () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((error) => {
      dbConnectionPromise = null;
      throw error;
    });
  }

  return dbConnectionPromise;
};

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Movie CRUD API (MVC Architecture)',
  });
});

// Connect to MongoDB before handling movie API requests
app.use('/api/v1/movies', async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Movie routes
app.use('/api/v1/movies', movieRoutes);

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: ${err.value}`,
    });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(
      (val) => val.message
    );

    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start a local server only outside Vercel
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await ensureDB();

      app.listen(PORT, () => {
        console.log(`Server running in development mode on port ${PORT}`);
      });
    } catch (error) {
      console.error(`Failed to start server: ${error.message}`);
      process.exit(1);
    }
  };

  startServer();
}

// Export Express app for Vercel
export default app;
