import jest from "@holypack/integration-jest";
import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    typescript(),
    jest(),
  ],
});

export default HOLYPACK_CONFIG;
