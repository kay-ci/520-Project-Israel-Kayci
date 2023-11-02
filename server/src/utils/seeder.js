/**
 * @author Israel Aristide
 * seed.js - Inserts all the data from our CSV dataset into the mongo database.
 */
const DB = require('../db/db.js');


/**
 * Inserts a list of meteorite objects to the db
 * @param {*} meteorites
 * @author Israel Aristide
 */
async function initDb(meteorites) {

  let db;

  try {

    db = new DB();
    await db.connect('space', 'meteorites');

    if(await db.collection.count() === 0){
      const num = await db.create(meteorites, true);
      console.log(`Inserted ${num.insertedCount} meteorites `);
    }

  } catch (e) {

    console.error('could not seed :(');
    console.dir(e);
    
  } finally {

    if (db) {
      db.close();
    }

    process.exit();

  }

}

/**
 * Checks if a string is empty or whitespace.
 * @param {*} str String to check
 * @returns True if the string is empty or whitespace, false if it not.
 * @author Israel Aristide
 */
function isEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}

/**
 * Callback function for when the CSV is fully parsed
 * @param {*} records The parsed CSV data
 * @author Israel Aristide
 */
function onParseFinish(records) {

  const meteorites = [];
  // Indicies: 0 name, 1 id, 2 name_type, 3 class,
  // 4 mass, 5 fall, 6 year, 7 lat, 8 long, 9 geolocation

  records.filter(rec => {

    // Checks every record and filters out ones with empty or NA values
    for (const val in rec) {

      if (isEmptyOrSpaces(val)) {
        return false;
      }

      if (val === 'NA') {
        return false;
      }

    }

    // If the mass value of the record is 0 filter it out
    if (rec[4] === '0') {
      return false;
    }

    // If the name_type value is not Valid then filter it out
    if (rec[2] !== 'Valid') {
      return false;
    }

    return true;

  }).forEach(rec => {
    meteorites.push({
      id: rec[1],
      name: rec[0],
      class: rec[3],
      mass: rec[4],
      year: rec[6],
      geolocation: {
        type: 'Point',
        coordinates: [
          rec[8],
          rec[7]
        ]
      }
    });
  });

  return meteorites;

}

module.exports = {
  initDb: initDb,
  isEmptyOrSpaces: isEmptyOrSpaces,
  onParseFinish: onParseFinish
};
