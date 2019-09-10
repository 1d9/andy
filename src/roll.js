// @flow strict

const roll = (count/*: number*/, sides/*: number*/) => {
  const dice/*: Array<{ result: number }>*/ = [];
  for (let i = 0; i < count; i++) {
    const result = Math.ceil(Math.random() * sides);
    dice.push({ result });
  }
  return dice;
};

module.exports = {
  roll,
};
