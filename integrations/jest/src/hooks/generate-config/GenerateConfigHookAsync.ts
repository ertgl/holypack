import type { Config } from "jest";
import type { AsyncParallelHook } from "tapable";

import type { JestContext } from "../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../options/JestIntegrationResolvedOptions";

export type GenerateConfigHookAsync = AsyncParallelHook<
  [
    jestContext: JestContext,
    jestIntegrationOptions: JestIntegrationResolvedOptions,
    config: Config,
  ]
>;
