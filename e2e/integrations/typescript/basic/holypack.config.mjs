import typescript from "@holypack/integration-typescript";
import defineConfig from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  extensions: [
    typescript(),
  ],
});

export default HOLYPACK_CONFIG;
