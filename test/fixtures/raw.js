const fs = require('fs');
const path = require('path');

const singleTestJsonOutput = fs.readFileSync(path.join(__dirname, 'singleTestJsonOutput.txt'), 'utf8');
const severalTestsJsonOutputs = fs.readFileSync(path.join(__dirname, 'severalTestsJsonOutput.txt'), 'utf8');
const failingTestJsonOutput = fs.readFileSync(path.join(__dirname, 'failingTestJsonOutput.txt'), 'utf8');
const skippedTestJsonOutput = fs.readFileSync(path.join(__dirname, 'skippedTestJsonOutput.txt'), 'utf8');
const debugTestJsonOutput = fs.readFileSync(path.join(__dirname, 'debugTestJsonOutput.txt'), 'utf8');
const coverageTestJsonOutput = fs.readFileSync(path.join(__dirname, 'coverageTestJsonOutput.txt'), 'utf8');

const raw = {
  coverageTestJsonOutput,
  debugTestJsonOutput,
  failingTestJsonOutput,
  severalTestsJsonOutputs,
  singleTestJsonOutput,
  skippedTestJsonOutput
};

module.exports = raw;
