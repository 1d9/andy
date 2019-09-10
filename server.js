// @flow strict
const { createAndy } = require('./src/andy');

const server = (port) => {
  const andy = createAndy(port);
  andy.start();
};

if (require.main === module) {
  server(8080);
}
