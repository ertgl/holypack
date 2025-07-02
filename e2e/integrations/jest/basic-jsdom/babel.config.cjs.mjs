import holypackCJSPreset from "@holypack/babel-preset/cjs/sync";

/**
 * @import { type TransformOptions } from "@babel/core";
 */

/**
 * @type {TransformOptions}
 */
const BABEL_CONFIG = {
  presets: [
    [
      holypackCJSPreset,
      {},
    ],
  ],
};

export default BABEL_CONFIG;
