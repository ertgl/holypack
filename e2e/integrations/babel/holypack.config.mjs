import babel from "@holypack/integration-babel";
import { defineConfig } from "holypack";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    babel(),
  ],
});

export default HOLYPACK_CONFIG;
