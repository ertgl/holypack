import holypack from "@holypack/eslint-plugin/default/sync";

/**
 * @import { type Linter } from "eslint";
 */

/**
 * @type {Linter.Config[]}
 */
const ESLINT_CONFIG = [
  ...holypack.configs.recommended,
];

export default ESLINT_CONFIG;
