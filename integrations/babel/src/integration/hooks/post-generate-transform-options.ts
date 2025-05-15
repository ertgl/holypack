import type { TransformOptions } from "@babel/core";
import { AsyncParallelHook } from "tapable";

import { INTEGRATION_NAME_BABEL } from "../../integration-metadata";

export const HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS = `${INTEGRATION_NAME_BABEL}#postGenerateTransformOptions`;

export type PostGenerateBabelTransformOptionsHook = AsyncParallelHook<PostGenerateBabelTransformOptionsHookParameters, void>;

export type PostGenerateBabelTransformOptionsHookParameters = [
  TransformOptions,
];

export function createPostGenerateBabelTransformOptionsHook(): PostGenerateBabelTransformOptionsHook
{
  return new AsyncParallelHook(
    [
      "transformOptions",
    ] as const,
    HOOK_NAME_BABEL_POST_GENERATE_TRANSFORM_OPTIONS,
  );
}
