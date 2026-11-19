# MVC Express App – Movie CRUD API

A Movie Management REST API built using **Node.js, Express.js, MongoDB, and Mongoose**, following the Model-View-Controller (MVC) architecture.

The application supports complete CRUD operations (Create, Read, Update, and Delete) for managing movie records.

## 🚀 Live Deployment

**Vercel URL:** https://mvc-express-app-two.vercel.app/

**Movies API:** https://mvc-express-app-two.vercel.app/api/v1/movies

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript (ES Modules)
- dotenv
- Vercel
- Thunder Client

## 📁 Project Structure

```text
MVC-Express-App/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── movieController.js
│
├── models/
│   └── movieModel.js
│
├── routes/
│   └── movieRoutes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ✨ Features

- Create a new movie.
- Retrieve all movies.
- Retrieve a movie using its ID.
- Update existing movie details.
- Delete a movie.
- MongoDB Atlas database integration.
- MVC architecture for organized code.
- RESTful API implementation.
- Cloud deployment using Vercel.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/divyasushma-cse/MVC-Express-App.git
```

### 2. Navigate to the Project Folder

```bash
cd MVC-Express-App
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB Atlas connection string.

**Note:** Never upload your `.env` file or database credentials to GitHub.

### 5. Run the Application

```bash
npm run dev
```

The local server runs at:

```text
http://localhost:8000
```

## 📡 API Endpoints

Base URL:

```text
/api/v1/movies
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/movies` | Create a movie |
| GET | `/api/v1/movies` | Retrieve all movies |
| GET | `/api/v1/movies/:id` | Retrieve a movie by ID |
| PUT | `/api/v1/movies/:id` | Update a movie |
| DELETE | `/api/v1/movies/:id` | Delete a movie |

## 📝 Sample JSON Request

### Create Movie (POST)

```json
{
  "title": "Inception",
  "category": "Sci-Fi",
  "year": 2010
}
```

### Update Movie (PUT)

```json
{
  "title": "Inception Updated",
  "category": "Sci-Fi",
  "year": 2010
}
```

## 🧪 API Testing

All five CRUD operations were successfully tested using **Thunder Client**.

- POST – Movie created successfully.
- GET – All movies retrieved successfully.
- GET by ID – Individual movie retrieved successfully.
- PUT – Movie updated successfully.
- DELETE – Movie deleted successfully.

Final verification confirmed that the deleted movie was no longer present in the database.

## ☁️ Deployment

The application is deployed on **Vercel** and uses **MongoDB Atlas** as its cloud database.

- Hosting: Vercel
- Database: MongoDB Atlas

## 🎯 Learning Outcomes

- Understanding MVC architecture.
- Building RESTful APIs using Express.js.
- Connecting Node.js applications with MongoDB.
- Performing CRUD operations using Mongoose.
- Testing APIs using Thunder Client.
- Deploying backend applications using Vercel.

## 👩‍💻 Author

**Divya Sushma Sri Appikatla**

GitHub: [divyasushma-cse](https://github.com/divyasushma-cse)

---

⭐ If you find this project useful, feel free to explore the repository.