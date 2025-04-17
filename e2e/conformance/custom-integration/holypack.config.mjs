import { defineConfig } from "holypack";

import example from "./integration.mjs";

const HOLYPACK_CONFIG = defineConfig({
  example: {
    flag: true,
  },
  integrations: [
    example,
  ],
});

export default HOLYPACK_CONFIG;
