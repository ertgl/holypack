import { join } from "node:path";

import { DIST_RELATIVE_PATH } from "./DIST_RELATIVE_PATH.mjs";

export const DIST_ESM_RELATIVE_PATH = join(
  DIST_RELATIVE_PATH,
  "esm",
);
