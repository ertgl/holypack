import eslint from "@holypack/integration-eslint";
import typescript from "@holypack/integration-typescript";
import defineConfig from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  extensions: [
    typescript(),
    eslint(),
  ],
});

export default HOLYPACK_CONFIG;
