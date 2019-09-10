// @flow strict
const { createListener } = require('@lukekaalim/server');
const { createServer } = require('http');

const { createRoutes } = require('./routes');

const createAndy = async (port/*: number*/) => {
  const server = createServer(createListener(createRoutes()));
  server.listen(port);
};

module.exports = {
  createAndy,
};