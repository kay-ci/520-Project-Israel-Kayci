const express = require('express');
const app = express();
const DB = require('../db/db');
const db = new DB();
app.use(express.static('../../client/build/')); 
app.use(express.json());

app.get('/', (req, res) => {
  try{
    res.json({message: 'Hello World'});
  }catch(e){
    res.status(404).json({message:'Root not fetched'});
  }
});

app.get('/meteorites', async (req, res) => {
  try{
    // Data
    const meteoriteData = await db.readAll();
    // Handle queries
    const minYear = req.query.minYear;
    const maxYear = req.query.maxYear;
    const minMass = req.query.minMass;
    const maxMass = req.query.maxMass;
    const className  = req.query.className;

    // Validation
    if (isNaN(minYear)){
      res.status(404).json({message:'Invalid minimum year'});
    }
    if ( isNaN(maxYear)){
      res.status(404).json({message:'Invalid maximum year'});
    }
    if (isNaN(minMass) || isNaN(maxMass)){
      res.status(404).json({message:'Invalid minimum mass, must be a number greater than 0'});
    }
    if (isNaN(maxMass)){
      res.status(404).json({message:'Invalid maximum mass'});
    }

    // Filter data
    let filteredData;
    if (minYear){
      filteredData = meteoriteData.filter(meteorite =>{
        meteorite.year >= minYear;
      });
    }if(maxYear){
      filteredData = meteoriteData.filter(meteorite =>{
        meteorite.year <= maxYear;
      });
    }if(minMass){
      filteredData = meteoriteData.filter(meteorite =>{
        meteorite.mass >= minMass;
      });
    }if(maxMass){
      filteredData = meteoriteData.filter(meteorite =>{
        meteorite.year <= maxMass;
      });
    }if (className) {
      filteredData = meteoriteData.filter(meteorite =>{
        meteorite.class.contains(className);
      });
    }
    res.json({data: filteredData});

  }catch(e){
    res.status(500).json({error: 'Data could not be read'});
    res.status(404).json({message:'Quotes could not be retrieved'});
  }
});

app.post('/meteorites/:meteorite/rate', (req, res) => {
  // To Implement
  res.send('POST request to the homepage');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found'
  });
});

module.exports = app;