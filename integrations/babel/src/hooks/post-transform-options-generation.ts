import type { TransformOptions } from "@babel/core";
import { AsyncParallelHook } from "tapable";

export const HOOK_NAME_BABEL_POST_TRANSFORM_OPTIONS_GENERATION = "babelPostTransformOptionsGeneration";

export type BabelPostTransformOptionsGenerationHook = AsyncParallelHook<BabelPostTransformOptionsGenerationHookParameters, void>;

export type BabelPostTransformOptionsGenerationHookParameters = [
  TransformOptions,
];

export function createBabelPostTransformOptionsGenerationHook(): BabelPostTransformOptionsGenerationHook
{
  return new AsyncParallelHook(
    [
      "transformOptions",
    ] as const,
    HOOK_NAME_BABEL_POST_TRANSFORM_OPTIONS_GENERATION,
  );
}
