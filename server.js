// @flow strict
const { createAndy } = require('./src/andy');

if (require.main === module) {
  createAndy(8080);
}
