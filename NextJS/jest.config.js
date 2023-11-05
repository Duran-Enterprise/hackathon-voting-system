const { defaults } = require('jest-config');

/** @type {import('jest').Config} */
const config = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    testEnvironment: 'jsdom',
};

module.exports = config;
