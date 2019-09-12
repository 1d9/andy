// @flow strict
const { createAndy } = require('./src/andy');
const { EOL } = require('os')

const server = (port) => {
  const andy = createAndy(port);
  andy.start();
  process.on('SIGINT', () => {
    process.stdout.write(EOL);
    andy.stop();
  })
};

if (require.main === module) {
  server(8080);
}
