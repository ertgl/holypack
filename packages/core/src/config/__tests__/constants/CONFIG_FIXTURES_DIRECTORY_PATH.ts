import { resolvePath } from "../../../lib/path/resolvePath";

import { CONFIG_DIRECTORY_PATH } from "./CONFIG_DIRECTORY_PATH";

export const CONFIG_FIXTURES_DIRECTORY_PATH = resolvePath(
  CONFIG_DIRECTORY_PATH,
  "__fixtures__",
);
