import type { TransformOptions } from "@babel/core";
import { AsyncParallelHook } from "tapable";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../config/assumptions";
import { INTEGRATION_NAME_BABEL } from "../../integration-metadata";

export const HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS = `${INTEGRATION_NAME_BABEL}#generateTransformOptions`;

export type GenerateBabelTransformOptionsHook = AsyncParallelHook<
  GenerateBabelTransformOptionsHookParameters,
  void
>;

export type GenerateBabelTransformOptionsHookParameters = [
  Context,
  Assumptions,
  TransformOptions,
  null | TransformOptions | undefined,
];

export function createGenerateBabelTransformOptionsHook(): GenerateBabelTransformOptionsHook
{
  return new AsyncParallelHook(
    [
      "context",
      "assumptions",
      "transformOptions",
      "overrides",
    ] as const,
    HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS,
  );
}
