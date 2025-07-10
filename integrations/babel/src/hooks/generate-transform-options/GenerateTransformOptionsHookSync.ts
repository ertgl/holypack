import type { TransformOptions } from "@babel/core";
import type { SyncHook } from "tapable";

import type { BabelConfiguratorResolvedOptions } from "../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelContext } from "../../context/BabelContext";

export type GenerateTransformOptionsHookSync = SyncHook<
  [
    babelContext: BabelContext,
    configuratorOptions: BabelConfiguratorResolvedOptions,
    transformOptions: TransformOptions,
  ]
>;
