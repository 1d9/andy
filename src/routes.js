// @flow strict
const { createRESTRoute, createRESTResponse } = require('@lukekaalim/server');
const { roll } = require('./roll');

const headers = [
  ['Content-Type', 'application/json']
];

const ok = body => createRESTResponse(200, JSON.stringify(body), headers);
const badInput = message => createRESTResponse(400, JSON.stringify({ code: 400, message }), headers);
const serverError = message => createRESTResponse(500, JSON.stringify({ code: 500, message }), headers);

const createRollRoute = () => createRESTRoute('GET', '/roll', query => {
  try {
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
  } catch (error) {
    return serverError(error.message);
  }
});

const createRoutes = () => [
  createRollRoute()
];

module.exports = {
  createRoutes,
};