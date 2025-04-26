import { defineConfig } from "eslint/config";

import createHolypackPlugin from "@holypack/eslint-plugin";

const holypack = await createHolypackPlugin();

const ESLINT_CONFIG = defineConfig([
  ...holypack.configs.recommended,
]);

export default ESLINT_CONFIG;
