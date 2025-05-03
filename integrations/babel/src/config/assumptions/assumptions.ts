import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import {
  inferBuildSettings,
  type InferredBuildSettings,
} from "./build";
import {
  inferEnvSettings,
  type InferredEnvSettings,
} from "./env";

export type Assumptions = {
  build: InferredBuildSettings;
  env: InferredEnvSettings;
};

export function createAssumptions(
  context: Context,
  overrides?: null | TransformOptions,
): Assumptions
{
  overrides ??= {};

  return {
    build: inferBuildSettings(
      context,
      overrides,
    ),
    env: inferEnvSettings(
      context,
      overrides,
    ),
  };
}
