module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',                // OK as an alias for jest-environment-jsdom
    setupFiles: ['jest-canvas-mock'],        // loads before any tests
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|svg)$': '<rootDir>/__mocks__/fileMock.js'
    }
}
