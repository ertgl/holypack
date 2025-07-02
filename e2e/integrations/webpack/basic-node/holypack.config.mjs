import typescript from "@holypack/integration-typescript";
import webpack from "@holypack/integration-webpack";
import defineConfig from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  extensions: [
    typescript(),
    webpack(),
  ],
});

export default HOLYPACK_CONFIG;
