import type { TransformOptions } from "@babel/core";
import type { AsyncParallelHook } from "tapable";

import type { BabelContext } from "../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../options/BabelIntegrationResolvedOptions";

export type GenerateTransformOptionsHookAsync = AsyncParallelHook<
  [
    babelContext: BabelContext,
    babelIntegrationOptions: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ]
>;
