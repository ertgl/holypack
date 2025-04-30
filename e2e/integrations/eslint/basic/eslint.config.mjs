import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import createHolypackPlugin from "@holypack/eslint-plugin";

/**
 * @import { type Linter } from "eslint";
 */

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const holypack = await createHolypackPlugin({
  context: {
    cwd: __dirname,
  },
});

/**
 * @type {Linter.Config[]}
 */
const ESLINT_CONFIG = [
  ...holypack.configs.recommended,
];

export default ESLINT_CONFIG;
