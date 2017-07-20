/*
  Jest JSON output comes with a lot of noise and undesired text before and after the json
  this function stripts all that undesired text
*/
const parseJestJsonOutput = (output) => {
  const start = output.indexOf('{');
  const end = output.lastIndexOf('}');

  return JSON.parse(output.substring(start, end + 1));
};

module.exports = parseJestJsonOutput;
