// @flow strict
const { roll } = require('./roll');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const expect2d6 = expect(() => {
  const dice = roll(2, 6);
  return assert('2d6 returns 2 dice', dice.length === 2);
});

const expectRoll = expectAll('roll() should roll n dice of y sides', [
  expect2d6,
]);

module.exports = {
  expectRoll,
};