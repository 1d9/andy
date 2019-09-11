// @flow strict
const { createListener } = require('@lukekaalim/server');
const { createServer } = require('http');

const { createRoutes } = require('./routes');

/*::
type Andy = {
  start: () => Promise<void>,
  stop: () => Promise<void>,
}
*/

const createAndy = (port/*: number*/)/*: Andy*/ => {
  const routes = createRoutes()
  const server = createServer(createListener(routes));

  const start = async () => {
    await new Promise(r => server.listen(port, r));
    const address = server.address();
    console.log(`Listening on http://localhost:${address.port}`);
  };

  const stop = async () => {
    await new Promise((res, rej) => server.close(err => err ? rej(err) : res()));
    server.close();
    console.log('Server No Longer Listening');
  };

  return { start, stop };
};

module.exports = {
  createAndy,
};