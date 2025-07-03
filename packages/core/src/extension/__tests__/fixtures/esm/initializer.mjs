import { TEST_FIXTURE_EXTENSION_UID_ESM } from "./TEST_FIXTURE_EXTENSION_UID_ESM.mjs";

/**
 * @import { type ExtensionFactoryAsync } from "../../../factory/ExtensionFactoryAsync";
 */

/**
 * @type {ExtensionFactoryAsync}
 */
export const ESM_EXTENSION_INITIALIZER = async (
  options,
// eslint-disable-next-line @typescript-eslint/require-await
) => ({
  $uid: TEST_FIXTURE_EXTENSION_UID_ESM,
  options,
});

export default ESM_EXTENSION_INITIALIZER;
