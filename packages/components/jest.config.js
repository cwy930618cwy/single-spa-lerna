module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    'vue'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  transform: {
    "^.+\\.ts$": 'ts-jest',
    "^.+\\.tsx$": './tsx-preprocessor',
    '^.+\\.jsx?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
};