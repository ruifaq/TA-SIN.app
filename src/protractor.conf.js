exports.config = {
    framework: 'jasmine',
    specs: ['./src/**/*.e2e-spec.ts'],
    directConnect: true,
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--no-sandbox']
      }
    }
  };
  