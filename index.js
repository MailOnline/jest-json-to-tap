#!/usr/bin/env node
const parseJestJsonOutput = require('./src/parseJestJsonOutput');
const jestOutputToTab = require('./src/jestOutputToTap');

const stdin = process.stdin;
const stdout = process.stdout;
const inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', (chunk) => {
  inputChunks.push(chunk);
});

stdin.on('end', () => {
  const jestJsonOutput = inputChunks.join('');
  const jestOutput = parseJestJsonOutput(jestJsonOutput);

  stdout.write(jestOutputToTab(jestOutput));
  stdout.write('\n');

  if (jestOutput.numFailedTests > 0) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});

