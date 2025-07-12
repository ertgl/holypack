import { join } from "node:path";

import { DOT_BUILD_RELATIVE_PATH } from "./DOT_BUILD_RELATIVE_PATH.mjs";

export const BOOTSTRAP_RELATIVE_PATH = join(
  DOT_BUILD_RELATIVE_PATH,
  "bootstrap",
);
