const express = require('express');
const router = express.Router();
const DB = require('../db/db');
const db = new DB();

router.get('/', async (req, res) => {
  try{
    // Data
    const meteoriteData = await db.readAll();
    // Handle queries
    let minYear = req.query.minYear;
    let maxYear = req.query.maxYear;
    let minMass = req.query.minMass;
    let maxMass = req.query.maxMass;
    const className  = req.query.className;

    // Validate query input
    if(minYear !== undefined || maxYear !== undefined){
      minYear = parseInt(minYear);
      maxYear = parseInt(maxYear);

      if (isNaN(minYear) || isNaN(maxYear)){
        return res.status(400).json({message:'Invalid year range'});
      }
    }
    
    if(minMass !== undefined || maxMass !== undefined){
      minMass = parseFloat(minMass);
      maxMass = parseFloat(maxMass);

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

router.post('/:meteorite/rate', (req, res) => {
  // To Implement
  res.send('POST request to the homepage');
});

router.use((req, res) => {
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
      parseInt(meteorite.year) >= minYear && meteorite.year <= maxYear;

    // Make sure meteorite.mass falls between min mass and max mass and 
    const massCondition = minMass === undefined || 
      parseFloat(meteorite.mass) >= minMass && meteorite.mass <= maxMass;

    const classCondition = className === undefined || meteorite.class.includes(className);

    return yearCondition && massCondition && classCondition;
  });
}
module.exports = router;
