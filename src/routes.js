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
    greeting: 'Welcome to andy! Try http://andy.1d9.tech/roll to roll some dice!',
  })
});

const createFarewellRoute = () => createRESTRoute('GET', '/bye', () => {
  return ok({
    farewell: 'Bye! I hope you had fun rolling! Join us on Mondays or Wednesdays in Rome if you want to roll some more!',
  })
});

const createRoutes = () => [
  createHomeRoute(),
  createRollRoute(),
  createFarewellRoute(),
];

module.exports = {
  createRoutes,
};