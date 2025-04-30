// TODO(ertgl): Convert the custom integration example to a test.

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { resolveContext } from "holypack";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const context = await resolveContext({
  cwd: __dirname,
});

console.log(context);
