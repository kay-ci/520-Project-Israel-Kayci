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

  // test('Response with invalid year range', async () => {

  // });

  // test('Response with invalid mass range', async () => {
    
  // });
});
