const parseJestJsonOutput = require('../../src/parseJestJsonOutput');
const {
  failingTestJsonOutput,
  severalTestsJsonOutputs,
  singleTestJsonOutput,
  skippedTestJsonOutput
} = require('./raw');

const fixtures = {
  failingTestResult: parseJestJsonOutput(failingTestJsonOutput),
  severalTestResults: parseJestJsonOutput(severalTestsJsonOutputs),
  singleTestResult: parseJestJsonOutput(singleTestJsonOutput),
  skippedTestResult: parseJestJsonOutput(skippedTestJsonOutput)
};

module.exports = fixtures;
