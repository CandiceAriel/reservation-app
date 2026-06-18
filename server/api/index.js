const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reservationRoutes = require("../src/routes/reservations");

const app = express();

const allowedOrigins = [
  "https://reservation-app-lemon.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;