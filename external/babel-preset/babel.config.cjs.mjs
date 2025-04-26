import { resolveBabelConfig } from "@holypack/internal-integration-babel";

const BABEL_CONFIG = resolveBabelConfig({
  targetExtension: ".cjs",
});

export default BABEL_CONFIG;
