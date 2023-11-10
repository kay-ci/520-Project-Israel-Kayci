module.exports = {
  'collectCoverageFrom': ['src/**/*.js', '!**/node_modules/**', '!src/utils/seed.js'],
  'coverageReporters': ['html', 'text', 'text-summary', 'cobertura'],
  'testMatch': ['**/*.test.js']
};