import { resolve as resolvePath } from "node:path";

import type { ResolvedProject } from "@holypack/core/plugins/project";

import {
  JEST_INTEGRATION_CONFIG_DEFAULT_COVERAGE_PATH_IGNORE_PATTERNS,
  JEST_INTEGRATION_CONFIG_DEFAULT_MODULE_DIRECTORIES,
  JEST_INTEGRATION_CONFIG_DEFAULT_MODULE_FILE_EXTENSIONS,
  JEST_INTEGRATION_CONFIG_DEFAULT_ROOTS,
  JEST_INTEGRATION_CONFIG_DEFAULT_TEST_PATH_IGNORE_PATTERNS,
  JEST_INTEGRATION_CONFIG_DEFAULT_TEST_REGEX,
  JEST_INTEGRATION_CONFIG_DEFAULT_TRANSFORM_IGNORE_PATTERNS,
} from "../../config";

import type {
  JestIntegrationConfigPluginOptions,
  JestIntegrationConfigPluginResolvedOptions,
} from "./plugin-options";

export function resolveJestIntegrationConfigPluginOptions(
  cwd: string,
  project: ResolvedProject,
  options?: boolean | JestIntegrationConfigPluginOptions | null,
): false | JestIntegrationConfigPluginResolvedOptions
{
  if (options === false)
  {
    return false;
  }

  const optionsObject = (
    options === true
      ? {}
      : options ?? {}
  );

  const overrides = optionsObject.overrides ?? {};

  return {
    ...optionsObject,
    overrides: {
      automock: false,
      bail: 0,
      // TODO(ertgl): Standardize root directory for caches.
      cacheDirectory: resolvePath(cwd, ".cache", "jest"),
      // TODO(ertgl): Create a core plugin for CI environment detection.
      ci: undefined,
      clearMocks: false,
      collectCoverage: true,
      coverageDirectory: "coverage",
      coveragePathIgnorePatterns: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_COVERAGE_PATH_IGNORE_PATTERNS,
      ],
      coverageProvider: "babel",
      displayName: project.name,
      // TODO(ertgl): Maybe resolve current workspace at the beginning so we can use the relevant `package.json` data to determine the default module system (e.g. `type` field) specified for the workspace.
      // TODO(ertgl): Create constants for possible default values of the option `extensionsToTreatAsEsm` in Jest configuration.
      extensionsToTreatAsEsm: [
        ".ts", // Should be conditional, awaiting the todo above (current workspace resolution).
        ".mts",
        ".tsx", // Should be conditional, awaiting the todo above (current workspace resolution).
        ".jsx", // Should be conditional, awaiting the todo above (current workspace resolution).
        ".mtsx",
        ".mjsx",
      ],
      // TODO(ertgl): Provide `globals` option in Jest integration options, so we can use it to configure ESLint as well. Consider supporting functional definition.
      globals: {},
      moduleDirectories: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_MODULE_DIRECTORIES,
      ],
      moduleFileExtensions: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_MODULE_FILE_EXTENSIONS,
      ],
      // TODO(ertgl): Provide a Jest integration option to enable setting `projects` option in the config automatically.
      projects: undefined,
      resetMocks: false,
      resetModules: false,
      restoreMocks: false,
      rootDir: cwd,
      roots: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_ROOTS,
      ],
      runner: "jest-runner",
      // TODO(ertgl): Support `jsdom` environment in Jest integration.
      testEnvironment: "jest-environment-node",
      testEnvironmentOptions: {},
      testLocationInResults: true,
      testPathIgnorePatterns: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_TEST_PATH_IGNORE_PATTERNS,
      ],
      testRegex: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_TEST_REGEX,
      ],
      testRunner: "jest-circus/runner",
      transformIgnorePatterns: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_TRANSFORM_IGNORE_PATTERNS,
      ],
      watchman: true,
      ...overrides,
    },
  };
}
