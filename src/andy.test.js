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

const expectAndy = expectAll('createAndy() should create an instance of an andy server', [
  expectServer,
]);

module.exports = {
  expectAndy,
};
