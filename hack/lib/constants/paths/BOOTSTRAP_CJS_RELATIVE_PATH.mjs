import { join } from "node:path";

import { BOOTSTRAP_RELATIVE_PATH } from "./BOOTSTRAP_RELATIVE_PATH.mjs";

export const BOOTSTRAP_CJS_RELATIVE_PATH = join(
  BOOTSTRAP_RELATIVE_PATH,
  "cjs",
);
