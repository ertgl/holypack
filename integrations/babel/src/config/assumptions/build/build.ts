import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import {
  inferBuildTargetSettings,
  type InferredBuildTargetSettings,
} from "./target";

export type InferredBuildSettings = {
  target: InferredBuildTargetSettings;
};

export function inferBuildSettings(
  context: Context,
  overrides?: null | TransformOptions,
): InferredBuildSettings
{
  return {
    target: inferBuildTargetSettings(
      context,
      overrides,
    ),
  };
}
