const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Acne-tracker listening on port: ${port}!`));