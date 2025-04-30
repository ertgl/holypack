/* eslint perfectionist/sort-variable-declarations: "error" */

export const JEST_INTEGRATION_CONFIG_DEFAULT_ROOTS = [
  "<rootDir>/test",
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_COVERAGE_PATH_IGNORE_PATTERNS = [
  /[\\/]node_modules[\\/]/iu.source,
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_EXTENSIONS_TO_TREAT_AS_ESM = [
  ".ts",
  ".mts",
  ".tsx",
  ".jsx",
  ".mtsx",
  ".mjsx",
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_TEST_REGEX = [
  /(?:.+\.)?(?:spec|test)\.[cm]?[jt]s[x]?/iu.source,
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_MODULE_FILE_EXTENSIONS = [
  "ts",
  "js",
  "mts",
  "mjs",
  "cts",
  "cjs",
  "tsx",
  "jsx",
  "mtsx",
  "mjsx",
  "ctsx",
  "cjsx",
  "json",
  "node",
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_MODULE_DIRECTORIES = [
  "node_modules",
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_TEST_PATH_IGNORE_PATTERNS = [
  /[\\/]node_modules[\\/]/iu.source,
];

export const JEST_INTEGRATION_CONFIG_DEFAULT_TRANSFORM_IGNORE_PATTERNS = [
  /[\\/]node_modules[\\/]/iu.source,
];
