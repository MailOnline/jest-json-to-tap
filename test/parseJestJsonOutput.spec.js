const parseJestJsonOutput = require('../src/parseJestJsonOutput');
const raw = require('./fixtures/raw');

describe('parseJestJsonOutput', () => {
  it('must return the parsed JSON of `jest --json` output', () => {
    Object.keys(raw).forEach((key) => {
      expect(parseJestJsonOutput(raw[key]))
        .toEqual(expect.objectContaining({
          numFailedTestSuites: expect.any(Number)
        }));
    });
  });
});
