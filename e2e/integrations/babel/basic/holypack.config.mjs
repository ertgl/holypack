import babel from "@holypack/integration-babel";
import defineConfig from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  extensions: [
    babel(),
  ],
});

export default HOLYPACK_CONFIG;
