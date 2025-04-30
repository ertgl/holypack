import { resolveBabelConfig } from "@holypack/internal-integration-babel";

const BABEL_CONFIG = resolveBabelConfig({
  targetExtension: ".mjs",
});

export default BABEL_CONFIG;
