import type { Config } from 'jest';

const config:Config = {
    collectCoverageFrom: [
        '**/*.ts', 
        '!**/node_modules/**',
        '!**/*.spec.ts',
        '!**/vendor/**'
    ],
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    globalSetup: 'jest-preset-angular/global-setup',
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/"
    ],
    transform: {
        '^.+\\.(ts|js|html)$': [ 'jest-preset-angular', {
        tsConfig:"<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.html$"
            },
        ],
    },

};

export default config;