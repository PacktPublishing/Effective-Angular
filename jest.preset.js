const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset ,
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 80
    },
  },
  collectCoverage : true,
  coverageReporters: [
    "cobertura",
    "lcov",
    "text"
  ]
};
