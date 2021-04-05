const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Check connexion to DB and ensure the API is running
connectDB();
app.get('/', (req, res) => res.send('API RUNNING'));

//Routes from url to back-end
app.use('/auth', require('./routes/api/auth'));
app.use('/item', require('./routes/api/item'));
app.use('/extra', require('./routes/api/extra'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));