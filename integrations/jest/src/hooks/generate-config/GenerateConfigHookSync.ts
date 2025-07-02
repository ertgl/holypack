import type { Config } from "jest";
import type { SyncHook } from "tapable";

import type { JestContext } from "../../context/JestContext";
import type { JestIntegrationResolvedOptions } from "../../options/JestIntegrationResolvedOptions";

export type GenerateConfigHookSync = SyncHook<
  [
    jestContext: JestContext,
    jestIntegrationOptions: JestIntegrationResolvedOptions,
    config: Config,
  ]
>;
