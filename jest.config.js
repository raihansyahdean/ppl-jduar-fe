module.exports = {
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//     '^~/(.*)$': '<rootDir>/$1',
//     '^vue$': 'vue/dist/vue.common.js'
//   },

  moduleFileExtensions: ['js', 'vue', 'json'],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    ".+\\.(mp3)$": "jest-transform-stub",
  },

  transformIgnorePatterns: [
    "node_modules/(?!vue-radial-progress|epic-spinners)",
  ],

  collectCoverage: true,

  coverageDirectory: './tests/__coverage__',

  coveragePathIgnorePatterns: ['/node_modules/'],

  collectCoverageFrom: [
      '<rootDir>/src/*.vue',
      '<rootDir>/src/components/*.vue'
    // '<rootDir>/pages/*.vue'
  ],

  preset: '@vue/cli-plugin-unit-jest'
}
