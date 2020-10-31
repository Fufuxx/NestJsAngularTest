// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { compilerOptions } = require('./tsconfig.base');

// module.exports = {
//   preset: 'jest-preset-angular',
//   roots: ['<rootDir>/'],
//   testMatch: ['**/+(*.)+(spec).+(ts)'],
//   setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
//   collectCoverage: true,
//   coverageReporters: ['html'],
//   coverageDirectory: 'coverage/nestangulartest',
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
//     prefix: '<rootDir>/'
//   })
// };
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  roots: ['<rootDir>/'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'NestAngularTest - Jest Unit Test Report',
        publicPath: './',
        filename: 'nestangulartest.html',
      },
    ],
  ]
};