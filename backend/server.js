const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // This allows us to POST and GET json data, req.body
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World! This is the backend port');
})

app.use('/auth', require('./routes/jwtAuth'));

// Dashboard route
app.use('/dashboard', require('./routes/dashboard'));

app.use('/entry', require('./routes/entry'));

app.listen(port, () => {
    console.log(`Acne-tracker listening on port: ${port}!`);
});