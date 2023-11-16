const app = require('../api.js');
const request = require('supertest');
const db = require('../src/db/db');
const mockData = require('./mockData');

/**
 * Mocking the DB
 * Data has to be minimum length 7 to get data back
 */
jest.mock('../src/db/db' );
const mockReadAll = jest.spyOn(db.prototype, 'readAllCache');
mockReadAll.mockResolvedValue(mockData);

describe('GET meteorites/', () => {
  test('Response with no parameters', async () => {
    const response = await request(app).get('/meteorites/');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      'status': 200,
      'page': 1,
      'pages':1,
      'params': {}, 
      'data': mockData
    });
  });

  test('Response with query parameters', async () => {
    const response = await request(app).
      get('/meteorites/?minYear=1800&maxYear=2023&minMass=0&maxMass=1000');
    
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      'status': 200,
      'page': 1,
      'pages':1,
      'params': {
        'minYear':1800, 
        'maxYear':2023,
        'minMass':0,
        'maxMass':1000
      }, 
      'data': mockData
    });
  });

  test('Response with invalid year input', async () => {
    // Invalid request since the min year is greater than max year
    const response = await request(app).get('/meteorites/?minYear=2020&maxYear=1990');

    // Invalid request since value is not a number
    const responseNaN = await request(app).get('/meteorites/?minYear=asd&maxYear=asd');
    
    const ExpectedBody = {
      'status':400,
      'message': 'Invalid year range'
    };

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(ExpectedBody);

    expect(responseNaN.status).toEqual(400);
    expect(responseNaN.body).toEqual(ExpectedBody);
  });

  test('Response with invalid mass input', async () => {
    // Invalid request since the min mass is greater than max mass
    const response = await request(app).get('/meteorites/?minMass=2000&maxMass=10');

    // Invalid request since value is not a number
    const responseNaN = await request(app).get('/meteorites/?minMass=asd&maxMass=asdsa');
    
    const ExpectedBody = {
      'status':400,
      'message': 'Invalid mass range'
    };

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(ExpectedBody);

    expect(responseNaN.status).toEqual(400);
    expect(responseNaN.body).toEqual(ExpectedBody);
  });
});
