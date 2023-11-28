const express = require('express');
const app = express();
const meteorites = require('./src/routes/meteorites');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Beyond Our Earth API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://3.96.191.159',
      description: 'Nasa Meteorites visualizer',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
  // or apis: ['.server/src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(express.static('../client/build')); 
app.use(express.json());
app.use('/meteorites', meteorites);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;