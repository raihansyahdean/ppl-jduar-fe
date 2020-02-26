module.exports = {
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//     '^~/(.*)$': '<rootDir>/$1',
//     '^vue$': 'vue/dist/vue.common.js'
//   },

  moduleFileExtensions: ['js', 'vue', 'json'],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },

  collectCoverage: true,

  coverageDirectory: '<rootDir>/tests/__coverage__',

  coveragePathIgnorePatterns: ['/node_modules/'],

  collectCoverageFrom: [
      '<rootDir>/src/*.vue',
    '<rootDir>/src/components/*.vue'
    // '<rootDir>/pages/*.vue'
  ],

  preset: '@vue/cli-plugin-unit-jest'
}
