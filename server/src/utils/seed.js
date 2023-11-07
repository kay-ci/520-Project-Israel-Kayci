const csv = require('csv-parse');
const fs = require('fs/promises');
const { initDb, onParseFinish } = require('./seeder.js');

fs.readFile('./server/src/utils/data/meteorites.csv').then(file => {
  
  // parse the CSV data
  csv.parse(file, (err, records) => {
    
    if (err === undefined) {
      
      const meteorites = onParseFinish(records);

      initDb(meteorites).then(() => {
        console.log('Seed finished!');
      });

    } else {
      console.error(`Failed to parse the CSV data! ${err}`);
    }

  });

});
