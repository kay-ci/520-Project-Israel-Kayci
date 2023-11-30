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
  test('200 Response with no parameters', async () => {
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

  test('200 Response with query parameters', async () => {
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

  describe('Year query tests', () => {
    test('400 Response with invalid year range', async () => {
      const ExpectedBody = {
        'status':400,
        'message': 'Invalid year range'
      };
  
      // Invalid request since the min year is greater than max year
      const response = await request(app).get('/meteorites/?minYear=2020&maxYear=1990');
  
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(ExpectedBody);  
    });
  
    test('400 Response with invalid year input', async () => {
      const ExpectedBody = {
        'status':400,
        'message': 'Invalid year range'
      };
  
      // Invalid request since value is not a number
      const responseNaN = await request(app).get('/meteorites/?minYear=asd&maxYear=asd');
  
      expect(responseNaN.status).toEqual(400);
      expect(responseNaN.body).toEqual(ExpectedBody);
    });
  });
  
  describe('Mass query tests', () => {
    test('400 Response with invalid mass range', async () => {
      // Invalid request since the min mass is greater than max mass
      const response = await request(app).get('/meteorites/?minMass=2000&maxMass=10');
  
      const ExpectedBody = {
        'status':400,
        'message': 'Invalid mass range'
      };
  
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(ExpectedBody);
    });
  
    test('400 Response with invalid mass input', async () => {
      const ExpectedBody = {
        'status':400,
        'message': 'Invalid mass range'
      };
  
      // Invalid request since value is not a number
      const responseNaN = await request(app).get('/meteorites/?minMass=asd&maxMass=asdsa');
  
      expect(responseNaN.status).toEqual(400);
      expect(responseNaN.body).toEqual(ExpectedBody);
    });

    test('404 Page not found request', async () => {
      const response = await request(app).get('/meteorites/?page=20000');
  
      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        status: 404, 
        message: `Page not found`
      });
    });
  });
});

describe('GET meteorites/on-latitudes', () => {
  test('200 GET request', async () => {
    const response = await request(app).get('/meteorites/on-latitudes');

    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual([
      {
        id: '30409',
        name: 'Zinder',
        class: 'Pallasite, ungrouped',
        mass: '46',
        year: '1999',
        geolocation: { type: 'Point', coordinates: ['8.96667', '-25.5'] }
      },
      {
        id: '31357',
        name: 'Zubkovsky',
        class: 'L6',
        mass: '432',
        year: '2003',
        geolocation: { type: 'Point', coordinates: ['41.5046', '90.2'] }
      },
      {
        id: '31357',
        name: 'Zubkovsky',
        class: 'L6',
        mass: '999',
        year: '2003',
        geolocation: { type: 'Point', coordinates: ['41.5046', '92'] }
      },
    ]);
    expect(response.body.data.length).toEqual(3);
  });

  test('404 Page not found request', async () => {
    const response = await request(app).get('/meteorites/on-latitudes?page=200');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      status: 404, 
      message: `Page not found`
    });
  });
});

describe('GET meteorites/country/{country}', () => {
  test('404 GET request invalid country', async () => {
    const response = await request(app).get('/meteorites/country/ooof');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      status: 404,
      message: `Country not found`
    });
  });

  test('404 GET request bad page', async () => {
    const response = await request(app).get('/meteorites/country/RU?page=900');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      status: 404, 
      message: `Page not found`
    });
  });

});

describe('GET meteorites/countries', () => {
  test('200 Get all countries', async () => {
    const response = await request(app).get('/meteorites/countries');
    expect(response.body).toEqual({
      status: 200,
      data: { '🇳🇪': 'NE', '🇨🇿': 'CZ', '🇷🇺': 'RU' } 
    });
  });
});

describe('GET /meteorites/nonexistant pages', () => {
  test('404 random route', async () => {
    const response = await request(app).get('/meteorites/adas/ad');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      status: 404, 
      message: `Page not found`
    });
  });
});