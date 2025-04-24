import createHolypackPlugin from "@holypack/eslint-plugin";

/**
 * @import { type Linter } from "eslint";
 */

const holypack = await createHolypackPlugin();

/**
 * @type {Linter.Config[]}
 */
const ESLINT_CONFIG = [
  ...holypack.configs.recommended,
];

export default ESLINT_CONFIG;
