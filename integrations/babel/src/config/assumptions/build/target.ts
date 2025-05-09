import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

export type InferredBuildTargetSettings = {
  isLegacy: boolean;
};

export function inferBuildTargetSettings(
  context: Context,
  overrides?: null | TransformOptions,
): InferredBuildTargetSettings
{
  return {
    isLegacy: context.legacy,
  };
}
