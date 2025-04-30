import { resolve as resolvePath } from "node:path";

import type { ResolvedProject } from "@holypack/core/plugins/project";

import {
  JEST_INTEGRATION_CONFIG_DEFAULT_COVERAGE_PATH_IGNORE_PATTERNS,
  JEST_INTEGRATION_CONFIG_DEFAULT_EXTENSIONS_TO_TREAT_AS_ESM,
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
  ci: boolean,
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
      ci,
      clearMocks: false,
      collectCoverage: true,
      coverageDirectory: "coverage",
      coveragePathIgnorePatterns: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_COVERAGE_PATH_IGNORE_PATTERNS,
      ],
      coverageProvider: "babel",
      displayName: project.name,
      extensionsToTreatAsEsm: [
        ...JEST_INTEGRATION_CONFIG_DEFAULT_EXTENSIONS_TO_TREAT_AS_ESM,
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
