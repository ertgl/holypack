import type { Config } from "jest";

import type { JestContext } from "../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../options/JestIntegrationResolvedOptions";

import { configureJestCacheDirectory } from "./fields/cache-directory/configureJestCacheDirectory";
import { configureJestCI } from "./fields/ci/configureJestCI";
import { configureJestCollectCoverage } from "./fields/collect-coverage/configureJestCollectCoverage";
import { configureJestCoverageDirectory } from "./fields/coverage-directory/configureJestCoverageDirectory";
import { configureJestCoverageProvider } from "./fields/coverage-provider/configureJestCoverageProvider";
import { configureJestDisplayName } from "./fields/display-name/configureJestDisplayName";
import { configureJestExtensionsToTreatAsEsm } from "./fields/extensions-to-treat-as-esm/configureJestExtensionsToTreatAsEsm";
import { configureJestModuleDirectories } from "./fields/module-directories/configureJestModuleDirectories";
import { configureJestModuleFileExtensions } from "./fields/module-file-extensions/configureJestModuleFileExtensions";
import { configureJestModulePaths } from "./fields/module-paths";
import { configureJestRootDir } from "./fields/root-dir/configureJestRootDir";
import { configureJestRoots } from "./fields/roots/configureJestRoots";
import { configureJestTestLocationInResults } from "./fields/test-location-in-results/configureJestTestLocationInResults";
import { configureJestTestRegex } from "./fields/test-regex/configureJestTestRegex";
import { configureJestTransformIgnorePatterns } from "./fields/transform-ignore-patterns/configureJestTransformIgnorePatterns";
import { configureJestTransform } from "./fields/transform/configureJestTransform";

export function generateConfig(
  jestContext: JestContext,
  jestIntegrationOptions: JestIntegrationResolvedOptions,
): Config
{
  const config: Config = {
    ...jestIntegrationOptions.overrides,
  };

  configureJestCacheDirectory(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestCI(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestCollectCoverage(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestCoverageDirectory(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestCoverageProvider(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestDisplayName(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestExtensionsToTreatAsEsm(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestModuleDirectories(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestModuleFileExtensions(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestModulePaths(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestRootDir(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestRoots(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestTestLocationInResults(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestTestRegex(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestTransform(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  configureJestTransformIgnorePatterns(
    jestContext,
    jestIntegrationOptions,
    config,
  );

  return config;
}
