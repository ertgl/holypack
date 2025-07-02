import { resolvePath } from "../../../lib/path/resolvePath";

import { EXTENSION_TESTS_DIRECTORY_PATH } from "./EXTENSION_TESTS_DIRECTORY_PATH";

export const EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH = resolvePath(
  EXTENSION_TESTS_DIRECTORY_PATH,
  "fixtures",
);
