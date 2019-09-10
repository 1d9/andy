// @flow strict
const { createAndy } = require('./andy');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const expectServer = expect(async () => {
  const andy = createAndy(0);
  try {
    await andy.start();
    return assert('andy should not throw any errors when started', true);
  } finally {
    await andy.stop();
  }
});

const expectThrowWhenStopButNoStart = expect(async () => {
  const andy = createAndy(0);
  try {
    await andy.stop();
    return assert('andy failed to throw an error when stop() was called before start', false);
  } catch (error) {
    return assert('andy should throw an error when stop() was called before start', true);
  }
});

const expectAndy = expectAll('createAndy() should create an instance of an andy server', [
  expectServer,
  expectThrowWhenStopButNoStart,
]);

module.exports = {
  expectAndy,
};
