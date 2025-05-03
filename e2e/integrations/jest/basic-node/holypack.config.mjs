import babel from "@holypack/integration-babel";
import jest from "@holypack/integration-jest";
import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    typescript(),
    babel(),
    jest(),
  ],
});

export default HOLYPACK_CONFIG;
