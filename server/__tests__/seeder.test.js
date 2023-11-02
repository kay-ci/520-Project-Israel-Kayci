const { isEmptyOrSpaces, onParseFinish } = require('../src/utils/seeder.js');

const fs = require('fs/promises');
const csv = require('csv-parse');


test('onParseFinish returns the right data and the right amount', async () => {

  const file = await fs.readFile('./src/utils/data/meteorites-subset.csv');
  const expected = [
    {
      id: '30409',
      name: 'Zinder',
      class: 'Pallasite, ungrouped',
      mass: '46',
      year: '1999',
      geolocation: { type: 'Point', coordinates: ['8.96667', '13.78333'] }
    },
    {
      id: '30410',
      name: 'Zlin',
      class: 'H4',
      mass: '3.3',
      year: '1939',
      geolocation: { type: 'Point', coordinates: ['17.66667', '49.25'] }
    },
    {
      id: '31357',
      name: 'Zubkovsky',
      class: 'L6',
      mass: '2167',
      year: '2003',
      geolocation: { type: 'Point', coordinates: ['41.5046', '49.78917'] }
    },
    {
      id: '30414',
      name: 'Zulu Queen',
      class: 'L3.7',
      mass: '200',
      year: '1976',
      geolocation: { type: 'Point', coordinates: ['-115.68333', '33.98333'] }
    }
  ];
  csv.parse(file, (err, recs) => {

    const meteors = onParseFinish(recs);

    expect(meteors.length).toEqual(4);
    expect(meteors).toEqual(expected);

  });

});

test('isEmptyOrSpace works peoperly', () => {
  expect(isEmptyOrSpaces(' ')).toEqual(true);
});

test('isEmptyOrSpace woks inverse', () => {
  expect(isEmptyOrSpaces('skalkjda')).toEqual(false);
});