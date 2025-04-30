import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { resolveContext } from "@holypack/core";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const context = await resolveContext({
  cwd: dirname(__dirname),
});

console.log(context);
