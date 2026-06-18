const express = require('express');
const cors = require('cors');

const reservationRoutes = require('./routes/reservations');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});