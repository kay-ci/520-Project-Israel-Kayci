const { isEmptyOrSpaces, onParseFinish } = require('../src/utils/seeder.js');

const fs = require('fs/promises');
const csv = require('csv-parse');


test('onParseFinish returns the right data and the right amount from file', async () => {

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

test('onFinishParse filters correctly', () => {

  // CSV contains two rows with NA values and one with an empty whitespace value
  // eslint-disable-next-line max-len, no-useless-escape
  const file = 'Zubkovsky,31357,Valid,L6, ,Found,2003,49.78917,41.5046,\"(49.78917, 41.5046)\"\nZubkovsky,31357,Valid,L6,NA,Found,2003,49.78917,41.5046,\"(49.78917, 41.5046)\"\nZubkovsky,313257,Valid,L6,2301,Found,2003,NA,NA,\"(NA, NA)\"\nZulu Queen,30414,Valid,L3.7,200,Found,1976,33.98333,-115.68333,"(33.98333, -115.68333)"';
  const expected = [
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
    expect(meteors.length).toEqual(1);
    expect(meteors).toEqual(expected);

  });

});

test('isEmptyOrSpace works peoperly', () => {
  expect(isEmptyOrSpaces(' ')).toEqual(true);
});

test('isEmptyOrSpace woks inverse', () => {
  expect(isEmptyOrSpaces('skalkjda')).toEqual(false);
});

describe('Filter NA values', () =>{
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
    }
  ];

  const records = [
    ['name', 'id', 'name_type', 'class', 'mass', 'fall', 'year', 'lat', 'long', 'geolocation'],
    ['Zinder', '30409', 'Valid', 'Pallasite, ungrouped', '46', 
      'Found', '1999', '8.96667', '13.78333', '(8.96667, 13.78333)'],
    ['Zlin', '30410', 'Valid', 'H4', '3.3', 
      'Found', '1939', '17.66667', '49.25', '(17.66667, 49.25)'],
    ['Zubkovsky', '31357', 'Valid', 'L6', '2167',
      'Found', '2003', '41.5046', '49.78917', '(41.5046, 49.78917)'],
    ['Zulu Queen', '30414', 'Valid', 'L3.7', '200',
      'Found', '1976', 'NA', 'NA', '(NA, NA)']
  ];

  const meteors = onParseFinish(records);

  expect(meteors.length).toEqual(3);
  expect(meteors).toEqual(expected);

});