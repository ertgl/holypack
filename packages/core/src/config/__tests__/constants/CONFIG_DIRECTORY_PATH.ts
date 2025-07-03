import { dirname } from "node:path";

import { CONFIG_TESTS_DIRECTORY_PATH } from "./CONFIG_TESTS_DIRECTORY_PATH";

export const CONFIG_DIRECTORY_PATH = dirname(
  CONFIG_TESTS_DIRECTORY_PATH,
);
