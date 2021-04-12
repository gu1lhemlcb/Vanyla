const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
//Middleware init
app.use(express.json({ extended: false }));

// Check connexion to DB and ensure the API is running
connectDB();
app.get('/', (req, res) => res.send('API RUNNING'));

//Routes from url to back-end
app.use('/auth', require('./routes/api/auth'));
app.use('/user', require('./routes/api/user_settings'));
app.use('/item', require('./routes/api/item'));
app.use('/extra', require('./routes/api/extra'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));