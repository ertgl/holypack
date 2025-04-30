import holypackLegacyPreset from "@holypack/babel-preset/legacy";

/**
 * @import { type TransformOptions } from "@babel/core";
 */

/**
 * @type {TransformOptions}
 */
const BABEL_CONFIG = {
  presets: [
    [
      holypackLegacyPreset,
      {},
    ],
  ],
};

export default BABEL_CONFIG;
