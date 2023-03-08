/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  moduleNameMapper: { '@/(.*)$': '<rootDir>/src/$1' },
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>'],
  setupFiles: ['<rootDir>/jest.setup.js'], 

  testEnvironment: "jsdom",

  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },

  transformIgnorePatterns: [
    "//node_modules/",
  ],
  watchman: true
};
