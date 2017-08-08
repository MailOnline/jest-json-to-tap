/*
  Jest JSON output comes with a lot of noise and undesired text before and after the json
  this function stripts all that undesired text
*/
const parseJestJsonOutput = (output) => {
  const start = output.lastIndexOf('{', output.indexOf('numFailedTestSuites'));
  const end = output.lastIndexOf('}');
  const jsonOutput = output.substring(start, end + 1).replace(',,', ',');

  return JSON.parse(jsonOutput);
};

module.exports = parseJestJsonOutput;
