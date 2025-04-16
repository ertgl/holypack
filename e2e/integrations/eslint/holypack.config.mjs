import eslint from "@holypack/integration-eslint";
import { defineConfig } from "holypack";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    eslint(),
  ],
});

export default HOLYPACK_CONFIG;
