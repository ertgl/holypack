import type { TransformOptions } from "@babel/core";
import type { SyncHook } from "tapable";

import type { BabelContext } from "../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../options/BabelIntegrationResolvedOptions";

export type GenerateTransformOptionsHookSync = SyncHook<
  [
    babelContext: BabelContext,
    babelIntegrationOptions: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ]
>;
