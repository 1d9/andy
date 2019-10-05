// @flow strict
const { roll, averageRoll } = require('./roll');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const expect2d6 = expect(() => {
  const dice = roll(2, 6);
  return assert('2d6 returns 2 dice', dice.length === 2);
});

const expectRoll = expectAll('roll() should roll n dice of y sides', [
  expect2d6,
]);
const expectAverage = expect(() => {
  return assert('2d6 averages 6.5', averageRoll(2, 6) === 6.5);
});

const expectAverageRolls = expectAll('roll() should roll ', [
  expectAverage,
]);

module.exports = {
  expectRoll,
  expectAverageRolls,
};
