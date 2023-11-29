const express = require('express');
const router = express.Router();
const DB = require('../db/db');
const db = new DB();
const { paginate } = require('../utils/pagination.js');

/**
 * @swagger
 * /meteorites:
 *   get:
 *     summary: Retrieve a list of meteorites
 *     description: Retrieve a list of meteorites while using query parameters to filter.
 *                  Used to display meteorite info and paginates the data to 7 items per page
 *     parameters:
 *       - in: query
 *         name: minYear
 *         required: false
 *         description: minimum year of found meteorites
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxYear
 *         required: false
 *         description: Maximum year of found meteorites
 *         schema:
 *           type: integer
 *       - in: query
 *         name: minMass
 *         required: false
 *         description: Minimum mass of found meteorites
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxMass
 *         required: false
 *         description: Maximum mass of found meteorites
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         required: false
 *         description: page of results
 *         schema:
 *           type: number
 * 
 *     responses:
 *       200:
 *         description: A list of meteorites. 
 *         schema:
 *           type: integer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 100
 *                 params:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The meteorite's full ID.
 *                         example: 65551337c6903aae33dbb404
 *                       id:
 *                         type: string
 *                         description: The meteorite's short ID.
 *                         example: 370
 *                       name:
 *                         type: string
 *                         description: The meteorite's name.
 *                         example: Achiras
 *                       class:
 *                         type: string
 *                         description: The meteorite's class name.
 *                         example: L6
 *                       mass:
 *                         type: string
 *                         description: The meteorite's mass in grams.
 *                         example: 780
 *                       year:
 *                         type: string
 *                         description: The year the meteorite crashed.
 *                         example: 1902
 *                       geolocation:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             description: 
 *                             example: Point
 *                           coordinates: 
 *                             type: array
 *                             items:
 *                               example: -64.95, -33.16667
 *       400:
 *         description: Invalid query parameters
 *         schema:
 *          type: integer
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Invalid year range
 *       500:
 *         description: Internal server error
 *         schema:
 *          type: integer
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 500
 *                message:
 *                  type: string
 *                  example: Meteorite data could not be read
 */
router.get('/', async (req, res) => {
  try {

    // Data
    const meteoriteData = await db.readAllCache();

    // Handle queries
    let minYear = req.query.minYear;
    let maxYear = req.query.maxYear;
    let minMass = req.query.minMass;
    let maxMass = req.query.maxMass;
    const page = parseInt(req.query.page ? req.query.page : 1);

    const className  = req.query.className;
    
    if (minYear !== undefined || maxYear !== undefined) {
      minYear = parseInt(minYear);
      maxYear = parseInt(maxYear);
    
      // Validate query input
      if (
        isNaN(minYear) || isNaN(maxYear) ||
        minYear > maxYear ||
        (minYear < 0 || maxYear < 0)
      ) {
        return res.status(400).json({status: 400, message:'Invalid year range'});
      }
    }

    if (minMass !== undefined || maxMass !== undefined) {
      minMass = parseFloat(minMass);
      maxMass = parseFloat(maxMass);
    

      if (
        isNaN(parseFloat(minMass)) || isNaN(parseFloat(maxMass)) ||
        minMass > maxMass ||
        minMass < 0 || maxMass < 0
      ) {
        return res.status(400).json({status: 400, message:'Invalid mass range'});
      }

    }

    // Filter data by query
    const filteredData = filter(meteoriteData, minYear, maxYear, minMass, maxMass, className);
    const paginated = paginate(filteredData, 7, page);
    res.json({
      status: 200,
      page: page,
      pages: paginated.pages,
      params: {
        minYear: minYear,
        maxYear: maxYear,
        minMass: minMass,
        maxMass: maxMass
      },
      data: paginated.page
    });

  }catch(e){
    res.status(500).json({status: 500, message: `Meteorite data could not be read: ${e}`});
  }
});

router.get('/on-latitudes', async (req, res) => {
  try{

    // Data
    const meteoriteData = await db.readAllCache();
    
    const page = parseInt(req.query.page ? req.query.page : 1);

    // Major latitude lines
    const northPole = 90;
    const arcticCirlce = 66.5;
    const tropicCancer = 23.5;
    const equator = 0;
    const tropicCapricorn = -23.5;
    const antarcticCircle = -66.5;
    const southPole = -90;

    // Get all meteorites on the latitude lines 
    const filteredData = meteoriteData.filter(meteor=>{
      return onLatitude(meteor, northPole) || onLatitude(meteor, arcticCirlce) || 
      onLatitude(meteor, tropicCancer) || onLatitude(meteor, equator) || 
      onLatitude(meteor, tropicCapricorn) || onLatitude(meteor, antarcticCircle) || 
      onLatitude(meteor, southPole);
    });

    const paginated = paginate(filteredData, 20, page);

    res.json({
      status: 200,
      page: page,
      pages: paginated.pages,
      data: paginated.page
    });

  }catch(e){
    res.status(500).json({status: 500, message: `Meteorite data could not be read: ${e}`});
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

function onLatitude(meteor, lat){
  const latitudeRange = 2;
  return Math.abs(parseFloat(meteor.geolocation.coordinates[1] - lat)) <= latitudeRange;
}

/**
 * @author Kayci Davila
 * Filter through meteorite data. checks if a query parameter is provided.
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
