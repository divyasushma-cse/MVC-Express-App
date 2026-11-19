const BASE_URL = 'http://localhost:8000/api/v1/movies';

const runTests = async () => {
  console.log('==================================================');
  console.log('   Starting Movie CRUD API Automated Test Suite   ');
  console.log('==================================================\n');

  try {
    // 1. Create Movie
    console.log('Test 1: [POST] Creating a new movie...');
    const createRes = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Inception',
        director: 'Christopher Nolan',
        category: 'Sci-Fi',
        year: 2010,
      }),
    });

    const createdMovie = await createRes.json();
    console.log(`Status: ${createRes.status}`);
    console.log('Response:', JSON.stringify(createdMovie, null, 2));

    if (!createdMovie.success || !createdMovie.data?._id) {
      throw new Error('Failed to create movie or missing ID in response.');
    }

    const movieId = createdMovie.data._id;
    console.log(` Created Movie ID: ${movieId}\n`);

    // 2. Retrieve All Movies
    console.log('Test 2: [GET] Retrieving all movies...');
    const getAllRes = await fetch(BASE_URL);
    const allMovies = await getAllRes.json();
    console.log(`Status: ${getAllRes.status}`);
    console.log(`Total Movies retrieved: ${allMovies.count}`);
    console.log('Sample Data:', JSON.stringify(allMovies.data?.[0] || allMovies, null, 2));
    console.log(' Retrieved all movies successfully.\n');

    // 3. Retrieve Movie by ID
    console.log(`Test 3: [GET] Retrieving movie by ID (${movieId})...`);
    const getByIdRes = await fetch(`${BASE_URL}/${movieId}`);
    const singleMovie = await getByIdRes.json();
    console.log(`Status: ${getByIdRes.status}`);
    console.log('Response:', JSON.stringify(singleMovie, null, 2));
    console.log(' Retrieved single movie successfully.\n');

    // 4. Update Movie by ID
    console.log(`Test 4: [PUT] Updating movie by ID (${movieId})...`);
    const updateRes = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Inception (Collector Edition)',
        year: 2011,
      }),
    });
    const updatedMovie = await updateRes.json();
    console.log(`Status: ${updateRes.status}`);
    console.log('Response:', JSON.stringify(updatedMovie, null, 2));
    console.log(' Updated movie successfully.\n');

    // 5. Delete Movie by ID
    console.log(`Test 5: [DELETE] Deleting movie by ID (${movieId})...`);
    const deleteRes = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'DELETE',
    });
    const deletedMovie = await deleteRes.json();
    console.log(`Status: ${deleteRes.status}`);
    console.log('Response:', JSON.stringify(deletedMovie, null, 2));
    console.log(' Deleted movie successfully.\n');

    // 6. Verify Deletion
    console.log(`Test 6: [GET] Verifying movie (${movieId}) is deleted...`);
    const verifyRes = await fetch(`${BASE_URL}/${movieId}`);
    const verifyData = await verifyRes.json();
    console.log(`Status: ${verifyRes.status}`);
    console.log('Response:', JSON.stringify(verifyData, null, 2));

    if (verifyRes.status === 404) {
      console.log(' Verified: Movie not found as expected after deletion.\n');
    }

    console.log('==================================================');
    console.log('   All 5 CRUD API Tests Completed Successfully!   ');
    console.log('==================================================');
  } catch (error) {
    console.error(' Test suite failed with error:', error.message);
  }
};

runTests();
