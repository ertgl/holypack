import { defineConfig } from "@holypack/webpack-plugin";

/**
 * @import { type Configuration } from "webpack";
 */

/**
 * @type {Configuration}
 */
const WEBPACK_CONFIG = await defineConfig({
  target: "node",
});

export default WEBPACK_CONFIG;
