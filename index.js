#!/usr/bin/env node
const streamBuffers = require('stream-buffers');
const parseJestJsonOutput = require('./src/parseJestJsonOutput');
const jestOutputToTab = require('./src/jestOutputToTap');

const stdin = process.stdin;
const stdout = process.stdout;
const dataStreamBuffer = new streamBuffers.WritableStreamBuffer({
  incrementAmount: 10 * 1024,
  initialSize: 100 * 1024
});

stdin.pipe(dataStreamBuffer);

stdin.on('end', () => {
  const jestJsonOutput = dataStreamBuffer.getContentsAsString('utf8');
  const jestOutput = parseJestJsonOutput(jestJsonOutput);

  stdout.write(jestOutputToTab(jestOutput));
  stdout.write('\n');

  if (jestOutput.numFailedTests > 0) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});

