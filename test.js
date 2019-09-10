// @flow strict
const { expect, expectAll, assert, emojiReporter } = require('@lukekaalim/test');
const { expectAndy } = require('./src/andy.test');
const { expectRoll } = require('./src/roll.test');
const { expectRoutes } = require('./src/routes.test');

const test = async () => {
  const expectation = expectAll('@lukekaalim/andy should be a server that rolls dice', [
    expectAndy,
    expectRoll,
    expectRoutes,
  ]);
  const assertion = await expectation.test();
  console.log(emojiReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

if (require.main === module) {
  test();
}
