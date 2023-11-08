const { paginate } = require('../src/utils/pagination.js');


describe('pagination works as expected', () => {
  
  const testData = ['one', 'two', 'three', 'four', 'five', 'six'];

  const evenCases = [
    [-1, []],
    [1, ['one', 'two']],
    [2, ['three', 'four']],
    [3, ['five', 'six']],
    [4, []]
  ];

  const oddCases = [
    [-1, []],
    [1, ['one', 'two', 'three', 'four']],
    [2, ['five', 'six']],
    [3, []]
  ];

  test.each(evenCases)('Given even distribution, page %p is as expected', (page, expected) => {

    const paginated = paginate(
      testData,
      2,
      page
    );

    expect(paginated.page).toEqual(expected);

  });

  test.each(oddCases)('Given odd distribution, page %p is as expected', (page, expected) => {

    const paginated = paginate(
      testData,
      4,
      page
    );

    expect(paginated.page).toEqual(expected);

  });

  test('Given more items per page than items, paginate returns all items', () => {
    const paginated = paginate(
      testData, 
      8,
      1
    );
    expect(paginated.page).toEqual(testData);
  });

});


// expect(pages.page).toEqual(['one', 'two']);

// pages = paginate(
//   ['one', 'two', 'three', 'four', 'five', 'six'],
//   2,
//   2
// );

// expect(pages.page).toEqual(['three', 'four']);

// pages = paginate(
//   ['one', 'two', 'three', 'four', 'five', 'six'],
//   2,
//   3
// );

// expect(pages.page).toEqual(['five', 'six']);


// pages = paginate(
//   ['one', 'two', 'three', 'four', 'five', 'six'],
//   2,
//   4
// );

// expect(pages.page).toEqual([]);