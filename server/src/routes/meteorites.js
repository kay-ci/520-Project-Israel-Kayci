const express = require('express');
const router = express.Router();
const DB = require('../db/db');
const db = new DB();
const { paginate } = require('../utils/pagination.js');
const countryCoder = require('@rapideditor/country-coder');

let countryCache = [];
let emojiCache = [];

/**
 * Get the countries that our data is in.
 * @author Israel Aristide
 * @returns 
 */
function getCountryCache(data) {
  if (countryCache.length === 0) {

    countryCache = data.map(x => {
      return countryCoder.iso1A2Code(x.geolocation.coordinates);
    }).filter((value, index, array) => {
      return value !== null && array.indexOf(value) === index;
    });

  }

  return countryCache;
}

/**
 * Get the countries that our data is in as emojis
 * @author Israel Aristide
 * @param {*} data 
 * @returns 
 */
function getEmojiCache(data) {

  if (emojiCache.length === 0) {
    emojiCache = data.map(x => {
      return countryCoder.emojiFlag(x.geolocation.coordinates);
    }).filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
  }

  return emojiCache;
}

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
 *       404:
 *         description: Invalid page query parameter
 *         schema:
 *          type: integer
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Page not found
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
    if (paginated.pages === 0){
      res.status(404).json({status: 404, message: `Page not found`});
    }else{
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
    }
    

  }catch(e){
    res.status(500).json({status: 500, message: `Meteorite data could not be read: ${e}`});
  }
});


/**
 * @swagger
 * /meteorites/on-latitudes:
 *   get:
 *     summary: Retrieve a list of meteorites near latitude
 *     description: Retrieve a list of meteorites near the 7 Major Latitude including
 *                  the North Pole, Arctic Cirlce, Tropic of Cancer, Equator, Tropic of Capricorn,
 *                  Antarctic Circle, and South Pole 
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: page of results
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: page containing a list of up to 20 meteorites. 
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
 *                               example: -64.95, 90.1
 *       404:
 *         description: Invalid page query parameter
 *         schema:
 *          type: integer
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Page not found
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
      return nearLatitude(meteor, northPole) || nearLatitude(meteor, arcticCirlce) || 
      nearLatitude(meteor, tropicCancer) || nearLatitude(meteor, equator) || 
      nearLatitude(meteor, tropicCapricorn) || nearLatitude(meteor, antarcticCircle) || 
      nearLatitude(meteor, southPole);
    });

    const paginated = paginate(filteredData, 20, page);

    if (paginated.pages === 0){
      res.status(404).json({status: 404, message: `Page not found`});
    }else{
      res.json({
        status: 200,
        page: page,
        pages: paginated.pages,
        data: paginated.page
      });
    }

  }catch(e){
    res.status(500).json({status: 500, message: `Meteorite data could not be read: ${e}`});
  }
});

/**
 * @swagger
 * /meteorites/country/{country}:
 *   get:
 *     summary: Retrieve a list of meteorites in a given country
 *     description: Retrieve a list of meteorites near a country of your choosing, 
 *                  avalible countries are shown in the /meteorittes/countries route.
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: iso1A2 country code
 *       - in: query
 *         name: page
 *         required: false
 *         description: page of results
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: page containing a list of up to 7 meteorites. 
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
 *                               example: -64.95, 90.1
 *       404:
 *         description: Invalid page query parameter
 *         schema:
 *          type: integer
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Page not found
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
router.get('/country/:country', async (req, res) => {
  try {
    const meteoriteData = await db.readAllCache();
    const countries = getCountryCache(meteoriteData);
    let filteredData = [];
    const page = parseInt(req.query.page ? req.query.page : 1);

    if (countries.includes(req.params.country)) {
      
      filteredData = meteoriteData.filter(x=> {
        return countryCoder.iso1A2Code(x.geolocation.coordinates) === req.params.country;
      });

    } else {
      res.status(404).json({status:404, message: 'Country not found'});
      return;
    }

    const paginated = paginate(filteredData, 7, page);

    if (paginated.pages === 0){
      res.status(404).json({status: 404, message: `Page not found`});
    } else {
      return res.json({
        status: 200,
        page: page,
        pages: paginated.pages,
        data: paginated.page
      });
    }
  }catch(e){
    res.status(500).json({status: 500, message: `Meteorite data could not be read: ${e}`});
  }

});

/**
 * @swagger
 * /meteorites/countries:
 *   get:
 *     summary: Retrieve a list of all available countries in the dataset
 *     description: Goes through all the meteorites in the dataset and gets all the countries 
 *                  that meteorites are located in.
 *     responses:
 *       200:
 *         description: page containing a list of up to 7 meteorites. 
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        <emoji>:
 *                         type: string
 *                         description: The country's ID.
 *                         example: CA
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
 *                  example: Countries data could not be read
 */
router.get('/countries', async (req, res) => {
  try {
    const meteoriteData = await db.readAllCache();
    const emojis = getEmojiCache(meteoriteData);
    const countries = getCountryCache(meteoriteData);
    let data = {};

    countries.map((item, indx) => {
      const obj = {};
      obj[emojis[indx]] = item;
      data = {...data, ...obj};
    });

    return res.json({
      status: 200,
      data: data
    });

  }catch(e){
    res.status(500).json({status: 500, message: `Countries data could not be read: ${e}`});
  }
});

router.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found'
  });
});

/**
 * Verify if meteor is near input latitude
 * @author Kayci Davila
 * @param {Object} meteor - The meteor object to check for proximity.
 * @param {number} latitude - The latitude to compare with the meteor's position.
 * @returns {boolean} Returns true if the meteor is near the specified latitude, otherwise false.
 */
function nearLatitude(meteor, latitude){

  const latitudeRange = 2;
  return Math.abs(parseFloat(meteor.geolocation.coordinates[1] - latitude)) <= latitudeRange;
}

/**
 * Filter through meteorite data. checks if a query parameter is provided.
 * @author Kayci Davila
 * @param {Array} meteoriteData - An array of meteorite data to be filtered.
 * @param {integer} minYear - The minimum year for filtering meteorites based on their fall year.
 * @param {number} maxYear - The maximum year for filtering meteorites based on their fall year.
 * @param {number} minMass - The minimum mass for filtering meteorites based on their mass.
 * @param {number} maxMass - The maximum mass for filtering meteorites based on their mass.
 * @param {string} className - The class name for additional filtering criteria.
 * @returns {Array} - An array of filtered meteorite data based on the provided query parameters.
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
