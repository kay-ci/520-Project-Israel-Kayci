const letterCount = require('../src/routes/letters.js');

test('maja contains 2 a',  () => {
  expect(letterCount('a', 'maja')).toEqual(2);
});