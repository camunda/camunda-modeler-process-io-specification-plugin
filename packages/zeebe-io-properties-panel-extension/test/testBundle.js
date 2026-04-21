const allTests = import.meta.webpackContext('.', {
  recursive: true,
  regExp: /.spec\.js$/
});

allTests.keys().forEach(allTests);