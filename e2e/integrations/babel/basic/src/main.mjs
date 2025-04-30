// TODO(ertgl): Convert the Babel integration example to a test.

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { resolveContext } from "holypack";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const context = await resolveContext({
  cwd: dirname(__dirname),
});

console.log(context);
