const express = require('express');
const app = express();
const meteorites = require('./src/routes/meteorites');

app.use(express.static('../client/build')); 
app.use(express.json());
app.use('/meteorites', meteorites);

module.exports = app;