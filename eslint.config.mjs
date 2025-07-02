import { defineConfig } from "eslint/config";

import holypack from "@holypack/eslint-plugin/default/sync";

const ESLINT_CONFIG = defineConfig([
  ...holypack.configs.recommended,
]);

export default ESLINT_CONFIG;
