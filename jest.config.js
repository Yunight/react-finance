export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "^@/(.+)": "<rootDir>/src/$1"
    },
    "collectCoverage": true,
    setupFilesAfterEnv: ['./jest.setup.js'],
};