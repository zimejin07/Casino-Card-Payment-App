// jest.config.js
module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "@testing-library/jest-dom/extend-expect",],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transform: {
        "^.+.(ts|tsx)$": "babel-jest", "^.+.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Path aliasing based on your tsconfig paths
        ".(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    },
    moduleDirectories: ["node_modules", "src"], // Allow absolute imports from src
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}", // Include files for coverage report
        "!src/**/*.d.ts", // Exclude type definition files
        "!**/node_modules/**", "!**/*.test.{ts,tsx}",],
};
