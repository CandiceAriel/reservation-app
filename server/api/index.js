const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Ensure the path to your routes is correct relative to this file
const reservationRoutes = require("../src/routes/reservations");

const app = express();

// Configure CORS
const allowedOrigins = [
  "https://reservation-app-lemon.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Only listen if not in production (Vercel manages the server)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;