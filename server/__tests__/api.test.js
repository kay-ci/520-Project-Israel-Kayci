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
      'data': mockData}
    );
  });


});
