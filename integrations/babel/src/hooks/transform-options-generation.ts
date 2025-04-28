import type { TransformOptions } from "@babel/core";
import { AsyncParallelHook } from "tapable";

import type { TypeSafeContext } from "@holypack/core";

export const HOOK_NAME_BABEL_TRANSFORM_OPTIONS_GENERATION = "babelTransformOptionsGeneration";

export type BabelTransformOptionsGenerationHook = AsyncParallelHook<BabelTransformOptionsGenerationHookParameters, void>;

export type BabelTransformOptionsGenerationHookParameters = [
  TypeSafeContext,
  TransformOptions,
];

export function createBabelTransformOptionsGenerationHook(): BabelTransformOptionsGenerationHook
{
  return new AsyncParallelHook(
    [
      "context",
      "transformOptions",
    ] as const,
    HOOK_NAME_BABEL_TRANSFORM_OPTIONS_GENERATION,
  );
}
