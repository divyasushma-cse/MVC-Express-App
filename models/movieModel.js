import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true,
    },
    director: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    category: {
      type: String,
      required: [true, 'Movie category is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Release year is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
