import jest from "@holypack/integration-jest";
import { defineConfig } from "holypack/config";

import { EXAMPLE_INTEGRATION } from "./src/index.mjs";

const HOLYPACK_CONFIG = defineConfig({
  example: {
    flag: true,
  },
  integrations: [
    EXAMPLE_INTEGRATION,
    jest(),
  ],
});

export default HOLYPACK_CONFIG;
