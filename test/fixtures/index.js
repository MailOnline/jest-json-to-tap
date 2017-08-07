const parseJestJsonOutput = require('../../src/parseJestJsonOutput');
const {
  debugTestJsonOutput,
  failingTestJsonOutput,
  severalTestsJsonOutputs,
  singleTestJsonOutput,
  skippedTestJsonOutput,
  coverageTestJsonOutput
} = require('./raw');

const fixtures = {
  coverageTestJsonOutput: parseJestJsonOutput(coverageTestJsonOutput),
  debugTestJsonOutput: parseJestJsonOutput(debugTestJsonOutput),
  failingTestResult: parseJestJsonOutput(failingTestJsonOutput),
  severalTestResults: parseJestJsonOutput(severalTestsJsonOutputs),
  singleTestResult: parseJestJsonOutput(singleTestJsonOutput),
  skippedTestResult: parseJestJsonOutput(skippedTestJsonOutput)
};

module.exports = fixtures;
