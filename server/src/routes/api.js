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

    // Validate query input
    if(minYear !== undefined || maxYear !== undefined){

      if (isNaN(parseInt(minYear)) || isNaN(parseInt(maxYear))){
        return res.status(400).json({message:'Invalid year range'});
      }
    }
    
    if(minMass !== undefined || maxMass !== undefined){

      if (isNaN(parseFloat(minMass)) || isNaN(parseFloat(maxMass))){
        return res.status(400).json({message:'Invalid mass range'});
      }
    }

    // Filter data by query
    const filteredData = filter(meteoriteData, minYear, maxYear, minMass, maxMass, className);

    res.json({data: filteredData});

  }catch(e){
    res.status(500).json({error: 'Meteorite data could not be read'});
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

/**
 * @author Kayci Davila
 * Filter through meteorite data. checks if a query parameter is provided.
 * (to test)
 */
function filter(meteoriteData, minYear, maxYear, minMass, maxMass, className){
  
  return meteoriteData.filter(meteorite => {

    // If undefined query not provided
    // Make sure meteorite.year falls between min year and max year and 
    const yearCondition = minYear === undefined || 
      meteorite.year >= minYear && meteorite.year <= maxYear;

    // Make sure meteorite.mass falls between min mass and max mass and 
    const massCondition = minMass === undefined || 
      meteorite.mass >= minMass && meteorite.mass <= maxMass;

    const classCondition = className === undefined || meteorite.class.includes(className);

    return yearCondition && massCondition && classCondition;
  });
}
module.exports = app;