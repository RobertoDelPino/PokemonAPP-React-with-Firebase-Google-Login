module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['./jest.setup.cjs'],
    projects:[
        {
            preset: 'ts-jest',
            displayName: 'project-1',
            testMatch: ['<rootDir>/src/**/*.node.test.ts'],
            testEnvironment: 'node',
        },
        {
            preset: 'ts-jest',
            displayName: 'project-2',
            testMatch: ['<rootDir>/src/**/*.jsdom.test.(ts|tsx)'],
            testEnvironment: 'jsdom',
        },
    ]
}