import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../../../config";
import type { BabelIntegrationEnvPluginOptions } from "../../plugin/plugin-options";
import { configureBabelPresetEnv } from "../presets/env";

export function configureBabelEnv(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  overrides?: null | TransformOptions,
  envPluginOptions?: BabelIntegrationEnvPluginOptions | null,
): void
{
  configureBabelPresetEnv(
    context,
    assumptions,
    transformOptions,
    overrides,
    envPluginOptions,
  );
}
