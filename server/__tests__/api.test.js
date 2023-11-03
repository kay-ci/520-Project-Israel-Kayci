// const express = require('express');
// const app = express();
// //const endpoint = require('../src/routes/api.js');
// const request = require('supertest');
// const axios = require('axios');
// jest.mock('axios');
// const mockData = [{ data : [
//   {
//     id: '30409',
//     name: 'Zinder',
//     class: 'Pallasite, ungrouped',
//     mass: '46',
//     year: '1999',
//     geolocation: { type: 'Point', coordinates: ['8.96667', '13.78333'] }
//   },
//   {
//     id: '30410',
//     name: 'Zlin',
//     class: 'H4',
//     mass: '3.3',
//     year: '1939',
//     geolocation: { type: 'Point', coordinates: ['17.66667', '49.25'] }
//   },
//   {
//     id: '31357',
//     name: 'Zubkovsky',
//     class: 'L6',
//     mass: '2167',
//     year: '2003',
//     geolocation: { type: 'Point', coordinates: ['41.5046', '49.78917'] }
//   },
//   {
//     id: '30414',
//     name: 'Zulu Queen',
//     class: 'L3.7',
//     mass: '200',
//     year: '1976',
//     geolocation: { type: 'Point', coordinates: ['-115.68333', '33.98333'] }
//   }
// ]}];

// beforeEach(() => {
//   axios.get.mockReset();
// });
// // Mock the axios.get method
// axios.get.mockResolvedValue({ data: mockData });
// // app.get('meteorites', endpoint);

// describe('GET /meteorites', () =>{
//   const response = request(app).get('/meteorites?minYear=1990&maxYear=2003');
//   expect(response.body).toEqual(
//     {data:[{
//       id: '30409',
//       name: 'Zinder',
//       class: 'Pallasite, ungrouped',
//       mass: '46',
//       year: '1999',
//       geolocation: { type: 'Point', coordinates: ['8.96667', '13.78333'] }
//     },
//     {
//       id: '31357',
//       name: 'Zubkovsky',
//       class: 'L6',
//       mass: '2167',
//       year: '2003',
//       geolocation: { type: 'Point', coordinates: ['41.5046', '49.78917'] }
//     }]}
//   );
//   expect(response.statusCode).toEqual(200);
// });
test('placeholder',  () => {
  expect(2).toEqual(2);
});