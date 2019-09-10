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

  const start = () => new Promise(res => {
    server.listen(port, () => {
      const address = server.address();
      console.log(`Listening on http://localhost:${address.port}`);
      res();
    });
  });

  const stop = () => new Promise((res, rej) => {
    server.close(err => err ? rej(err) : res());
  });

  return { start, stop };
};

module.exports = {
  createAndy,
};