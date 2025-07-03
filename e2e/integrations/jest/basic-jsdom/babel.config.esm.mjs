import holypackPreset from "@holypack/babel-preset/default/sync/esm";

/**
 * @import { type TransformOptions } from "@babel/core";
 */

/**
 * @type {TransformOptions}
 */
const BABEL_CONFIG = {
  presets: [
    [
      holypackPreset,
      {},
    ],
  ],
};

export default BABEL_CONFIG;
