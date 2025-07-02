const { TEST_FIXTURE_EXTENSION_UID_CJS } = require("./TEST_FIXTURE_EXTENSION_UID_CJS.cjs");

/**
 * @import { type ExtensionFactorySync } from "../../../factory/ExtensionFactorySync";
 */

/**
 * @type {ExtensionFactorySync}
 */
const CJS_EXTENSION_INITIALIZER = (
  options,
) => ({
  $uid: TEST_FIXTURE_EXTENSION_UID_CJS,
  options,
});

module.exports = CJS_EXTENSION_INITIALIZER;
