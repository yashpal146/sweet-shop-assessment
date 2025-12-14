const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Grandma's Sweets API" });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sweets', require('./routes/sweetsRoutes'));

module.exports = app;