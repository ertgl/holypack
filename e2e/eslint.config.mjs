import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { resolveConfig } from "@holypack/integration-eslint";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const ESLINT_CONFIG = await resolveConfig({
  cwd: __dirname,
});

export default ESLINT_CONFIG;
