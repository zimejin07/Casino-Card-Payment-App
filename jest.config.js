process.env.BABEL_CONFIG_PATH = './babel-jest.config.js'; // inject Babel config manually

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { configFile: process.env.BABEL_CONFIG_PATH }]
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.test.{ts,tsx}"
  ],
};
