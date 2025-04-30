import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    typescript(),
  ],
});

export default HOLYPACK_CONFIG;
