const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Ensure environment variables are loaded

const reservationRoutes = require("../src/routes/reservations");

const app = express();

// 1. Configure CORS to allow your specific frontend domains
const allowedOrigins = [
  "reservation-app-lemon.vercel.app" // Update this to your actual Vercel URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

// 2. Middleware to parse JSON bodies
app.use(express.json());

// 3. Define Routes
// The request path will be /api/reservations/ (from this line) 
// + the route defined in your reservations.js file
app.use("/api/reservations", reservationRoutes);

// 4. Basic health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 5. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});