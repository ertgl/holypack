import holypackESMPreset from "@holypack/babel-preset/sync";

/**
 * @import { type TransformOptions } from "@babel/core";
 */

/**
 * @type {TransformOptions}
 */
const BABEL_CONFIG = {
  presets: [
    [
      holypackESMPreset,
      {},
    ],
  ],
};

export default BABEL_CONFIG;
