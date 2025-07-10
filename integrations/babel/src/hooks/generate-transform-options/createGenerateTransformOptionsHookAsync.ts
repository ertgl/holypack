import { AsyncParallelHook } from "tapable";

import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC } from "./BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC";
import type { GenerateTransformOptionsHookAsync } from "./GenerateTransformOptionsHookAsync";

export function createGenerateTransformOptionsHookAsync(): GenerateTransformOptionsHookAsync
{
  return new AsyncParallelHook(
    [
      "babelContext",
      "configuratorOptions",
      "transformOptions",
    ] as const,
    BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC,
  );
}
