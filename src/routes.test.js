// @flow strict
const { createRoutes } = require('./routes');
const { Readable } = require('stream');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const expectRollRouteExists = expect(() => {
  const routes = createRoutes();
  class RollRouteRequest extends Readable {
    rawHeaders = [];
    method = 'GET';
    url = '/roll';
  }
  return assert('There should be a GET route for /roll', !!routes.find(route => route.test(new RollRouteRequest())))
});

const expectRoutes = expectAll('createRoutes() should return all the routes for the application', [
  expectRollRouteExists,
]);

module.exports = {
  expectRoutes,
};
