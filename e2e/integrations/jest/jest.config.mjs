/**
 * @import { type Config } from "jest";
 */

/**
 * @type {Config}
 */
const JEST_CONFIG = {
  // NOTE: Do not `require.resolve` the preset here,
  // Jest loads presets using another strategy.
  preset: "@holypack/jest-preset",
};

export default JEST_CONFIG;
