import Movie from '../models/movieModel.js';

// 1. Create a new movie
export const createMovie = async (req, res, next) => {
  try {
    const { title, director, category, year } = req.body;

    if (!title || !category || !year) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and year',
      });
    }

    const movie = await Movie.create({
      title,
      director,
      category,
      year,
    });

    return res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Retrieve all movies with optional category filtering
export const readMovies = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const movies = await Movie.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Retrieve a movie by its ID
export const readMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Update a movie using its ID
export const updateMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// 5. Delete a movie using its ID
export const deleteMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
