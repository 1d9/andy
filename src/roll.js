// @flow strict

const roll = (count/*: number*/, sides/*: number*/) => {
  const dice/*: Array<{ result: number }>*/ = [];
  for (let i = 0; i < count; i++) {
    const result = Math.ceil(Math.random() * sides);
    dice.push({ result });
  }
  return dice;
};

const averageRoll = (count/*: number*/, sides/*: number*/) => {
  return (((count * sides) + count) / 2)
}

module.exports = {
  roll,
  averageRoll,
};
