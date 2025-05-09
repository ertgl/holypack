import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { JestIntegrationHookSet } from "../../integration/eventing";
import {
  HOOK_NAME_JEST_GENERATE_CONFIG,
  HOOK_NAME_JEST_POST_GENERATE_CONFIG,
} from "../../integration/hooks";
import { configureJestCacheDirectory } from "../fields/cache-directory";
import { configureJestCI } from "../fields/ci";
import { configureJestCollectCoverage } from "../fields/collect-coverage";
import { configureJestCoverageDirectory } from "../fields/coverage-directory";
import { configureJestCoveragePathIgnorePatterns } from "../fields/coverage-path-ignore-patterns";
import { configureJestCoverageProvider } from "../fields/coverage-provider";
import { configureJestDisplayName } from "../fields/display-name";
import { configureJestExtensionsToTreatAsEsm } from "../fields/extensions-to-treat-as-esm";
import { configureJestModuleDirectories } from "../fields/module-directories";
import { configureJestModuleFileExtensions } from "../fields/module-file-extensions";
import { configureJestRootDir } from "../fields/root-dir";
import { configureJestRoots } from "../fields/roots";
import { configureJestTestLocationInResults } from "../fields/test-location-in-results";
import { configureJestTestPathIgnorePatterns } from "../fields/test-path-ignore-patterns";
import { configureJestTestRegex } from "../fields/test-regex";
import { configureJestTransform } from "../fields/transform";
import { configureJestTransformIgnorePatterns } from "../fields/transform-ignore-patterns";
import { createConfigPreset } from "../presets";

import type { JestConfigGeneratorOptions } from "./options";

export async function generateJestConfig(
  context: Context,
  hooks: JestIntegrationHookSet,
  options?: JestConfigGeneratorOptions | null,
): Promise<Config>
{
  options ??= {};

  const overrides: Config = options.overrides ?? {};

  const config: Config = {};

  const preset = createConfigPreset(
    context,
    overrides,
  );

  configureJestCacheDirectory(
    context,
    config,
    preset,
    overrides,
  );

  configureJestCI(
    context,
    config,
    preset,
    overrides,
  );

  configureJestCollectCoverage(
    context,
    config,
    preset,
    overrides,
  );

  configureJestCoverageDirectory(
    context,
    config,
    preset,
    overrides,
  );

  configureJestCoveragePathIgnorePatterns(
    context,
    config,
    preset,
    overrides,
  );

  configureJestCoverageProvider(
    context,
    config,
    preset,
    overrides,
  );

  configureJestDisplayName(
    context,
    config,
    preset,
    overrides,
  );

  configureJestExtensionsToTreatAsEsm(
    context,
    config,
    preset,
    overrides,
  );

  configureJestModuleDirectories(
    context,
    config,
    preset,
    overrides,
  );

  configureJestModuleFileExtensions(
    context,
    config,
    preset,
    overrides,
  );

  configureJestRootDir(
    context,
    config,
    preset,
    overrides,
  );

  configureJestRoots(
    context,
    config,
    preset,
    overrides,
  );

  configureJestTestLocationInResults(
    context,
    config,
    preset,
    overrides,
  );

  configureJestTestPathIgnorePatterns(
    context,
    config,
    preset,
    overrides,
  );

  configureJestTestRegex(
    context,
    config,
    preset,
    overrides,
  );

  configureJestTransformIgnorePatterns(
    context,
    config,
    preset,
    overrides,
  );

  configureJestTransform(
    context,
    config,
    preset,
    overrides,
  );

  await hooks[HOOK_NAME_JEST_GENERATE_CONFIG].promise(
    context,
    config,
    preset,
    overrides,
  );

  await hooks[HOOK_NAME_JEST_POST_GENERATE_CONFIG].promise(config);

  return config;
}
