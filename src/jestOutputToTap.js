const jestOutputToTap = (output) => {
  const text = [
    `1..${output.numTotalTests}`
  ];

  const tests = output.testResults
    .map((result) => result.assertionResults)
    .reduce((memo, test) => [...memo, ...test], []);

  tests.forEach((test, idx) => {
    if (test.status === 'passed') {
      text.push(`ok ${idx + 1} ${test.title}`);
    } else if (test.status === 'failed') {
      text.push(`not ok ${idx + 1} ${test.title}`);

      if (test.failureMessages.length > 0) {
        const diagnostics = test.failureMessages
          .reduce((lines, msg) => lines.concat(msg.split('\n')), [])
          .map((line) => `# ${line}`)
          .join('\n');

        text.push(diagnostics);
      }
    } else if (test.status === 'pending') {
      text.push(`ok ${idx + 1} ${test.title} # SKIP -`);
    }
  });

  text.push(`# tests ${output.numTotalTests}`);
  text.push(`# pass ${output.numPassedTests}`);
  text.push(`# fail ${output.numFailedTests}`);

  return text.join('\n');
};

module.exports = jestOutputToTap;
