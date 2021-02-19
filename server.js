const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

const dbConnection = config.get('dbConnection');
const port = process.env.PORT || 4000;
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => app.listen.port));
    .catch((err) => console.log(err));