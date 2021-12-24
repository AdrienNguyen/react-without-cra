const paths = require('../config/paths')

const config = {
    rootDir: '../',
    transform: {
        '^.+\\.(jsx?|tsx?)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: [paths.testsSetup],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/config/jest/assetsTransformer.js',
        '\\.svg$': '<rootDir>/config/jest/svgrMock.js',
        '^.+\\.(css|less|scss)$': '<rootDir>/config/jest/cssMock.js',
        '^@p/(.*)$': '<rootDir>/public/static/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

module.exports = config
