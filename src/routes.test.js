// @flow strict
const { createRoutes } = require('./routes');
const { Readable, Writable } = require('stream');
const { expect, expectAll, assert } = require('@lukekaalim/test');
const { createListener } = require('@lukekaalim/server');

const requestListener = (listener) => (url = '/', method = 'GET', body = '') => {
  class Request extends Readable {
    rawHeaders = [];
    method = method;
    url = url;

    _read() {
      this.push(body);
      this.push(null);
    }
  }

  return new Promise(resolve => {
    class Response extends Writable {
      status = null;
      responseBody = '';
  
      writeHead(status, rawHeaders) {
        this.status = status;
      }

      _write(chunk, encoding , cb) {
        this.responseBody += chunk.toString();
        cb();
      }
      _final(cb) {
        const { status, responseBody } = this;
        resolve({ status, responseBody })
      }
    }
    listener(new Request(), new Response());
  });
};

const expectRollRouteRoll = expect(async () => {
  const routes = createRoutes();
  const listener = createListener(routes);
  const response = await requestListener(listener)('/roll?count=1&sides=4');

  return assert('There should be a GET route for /roll', response.status === 200);
});

const expect404OnNoRouteExist = expect(async () => {
  const routes = createRoutes();
  const listener = createListener(routes);
  const response = await requestListener(listener)('/arbitrary-route');

  return assert('There should be a 404 response for any route that isnt /roll', response.status === 404);
});

const expect400OnMissingQuery = expect(async () => {
  const routes = createRoutes();
  const listener = createListener(routes);
  const response = await requestListener(listener)('/roll');

  return assert('There should be a 400 response for any /roll request that doesnt include search params', response.status === 400);
});

const expectIncorrect = expect(() => {
  const routes = createRoutes();
  class RollRouteRequest extends Readable {
    rawHeaders = [];
    method = 'GET';
    url = '/roll';
  }
  return assert('There should be a GET route for /roll', !!routes.find(route => route.test(new RollRouteRequest())))
});

const expectRoutes = expectAll('createRoutes() should return all the routes for the application', [
  expectRollRouteRoll,
  expect404OnNoRouteExist,
  expect400OnMissingQuery,
]);

module.exports = {
  expectRoutes,
};
