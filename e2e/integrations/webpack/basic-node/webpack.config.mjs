import { defineConfigAsync } from "@holypack/webpack-plugin";

/**
 * @import { type Configuration } from "webpack";
 */

/**
 * @type {Configuration}
 */
const WEBPACK_CONFIG = await defineConfigAsync({
  overrides: {
    target: "node",
  }
});

export default WEBPACK_CONFIG;
