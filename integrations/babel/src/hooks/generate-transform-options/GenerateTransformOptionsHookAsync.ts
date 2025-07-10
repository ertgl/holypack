import type { TransformOptions } from "@babel/core";
import type { AsyncParallelHook } from "tapable";

import type { BabelConfiguratorResolvedOptions } from "../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelContext } from "../../context/BabelContext";

export type GenerateTransformOptionsHookAsync = AsyncParallelHook<
  [
    babelContext: BabelContext,
    configuratorOptions: BabelConfiguratorResolvedOptions,
    transformOptions: TransformOptions,
  ]
>;
