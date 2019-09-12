// @flow strict
const { createRESTRoute, createRESTResponse } = require('@lukekaalim/server');
const { roll } = require('./roll');

const headers = [
  ['Content-Type', 'application/json']
];

const ok = body => createRESTResponse(200, JSON.stringify(body), headers);
const badInput = message => createRESTResponse(400, JSON.stringify({ code: 400, message }), headers);

const createRollRoute = () => createRESTRoute('GET', '/roll', query => {
  const count = parseInt(query.get('count'), 10);
  const sides = parseInt(query.get('sides'), 10);
  if (!count || !sides) {
    return badInput('Missing ?count or ?sides query parameter');
  }
  const dice = roll(count, sides);
  const result = dice.map/*:: <number>*/(die => die.result).reduce((a, b) => a + b);

  return ok({
    count,
    sides,
    dice,
    result,
  })
});

const createHomeRoute = () => createRESTRoute('GET', '/', () => {
  return ok({
    greeting: 'Welcome to andy! Try /roll to roll some dice!',
  })
});

const createRoutes = () => [
  createHomeRoute(),
  createRollRoute()
];

module.exports = {
  createRoutes,
};