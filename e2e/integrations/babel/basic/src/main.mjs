import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { resolveContext } from "@holypack/core";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const __dirname = dirname(__filename);

const context = await resolveContext({
  cwd: dirname(__dirname),
});

console.log(context);
