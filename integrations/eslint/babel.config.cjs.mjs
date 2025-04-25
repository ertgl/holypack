import { resolveConfig } from "@holypack/integration-babel/deprecated";

const BABEL_CONFIG = await resolveConfig({
  targetExtension: ".cjs",
});

export default BABEL_CONFIG;
