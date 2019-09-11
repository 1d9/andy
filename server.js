// @flow strict
const { createAndy } = require('./src/andy');

const server = (port) => {
  const andy = createAndy(port);
  andy.start();
  process.on('SIGINT', () => {
    andy.stop();
  })
};

if (require.main === module) {
  server(8080);
}
