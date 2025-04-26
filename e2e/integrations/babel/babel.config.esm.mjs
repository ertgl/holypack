import createHolypackPreset from "@holypack/babel-preset";

/**
 * @import { type TransformOptions } from "@babel/core";
 */

const holypackPreset = await createHolypackPreset();

/**
 * @type {TransformOptions}
 */
const BABEL_CONFIG = {
  presets: [
    [
      holypackPreset.value,
      {},
    ],
  ],
};

export default BABEL_CONFIG;
