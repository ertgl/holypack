import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

export type InferredEnvSettings = {
  isTest: boolean;
};

export function inferEnvSettings(
  context: Context,
  overrides?: null | TransformOptions,
): InferredEnvSettings
{
  return {
    isTest: process.env.NODE_ENV === "test",
  };
}
