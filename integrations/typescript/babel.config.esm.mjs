import { resolveConfig } from "@holypack/integration-babel";

const BABEL_CONFIG = await resolveConfig({
  targetExtension: ".mjs",
});

export default BABEL_CONFIG;
