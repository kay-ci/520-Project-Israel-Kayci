function letterCount(letter, word) {

  let count = 0;
  for (lett of word) {
    if (lett === letter) {
      count++;
    }
  }
  return count;
}

module.exports = letterCount; 