import {
  type ConfigAPI,
  type ConfigFunction,
  type ConfigItem,
  createConfigItem,
  type TransformOptions,
} from "@babel/core";

import {
  requireIntegration,
  resolveContext,
  type StrictContext,
} from "@holypack/core";
import {
  BabelIntegration,
  INTEGRATION_NAME_BABEL,
} from "@holypack/integration-babel";

import type { HolypackPresetOptions } from "./preset-options";

export type HolypackPreset = ConfigItem;

export async function createHolypackPreset(
  options?: HolypackPresetOptions | null,
): Promise<HolypackPreset>
{
  options ??= {};

  const context = await resolveContext(options.context);

  const integration = requireIntegration<BabelIntegration>(
    context as unknown as StrictContext,
    INTEGRATION_NAME_BABEL,
  );

  const transformOptions = await integration.api.generateBabelTransformOptions(context);

  const configFunction: ConfigFunction = (
    api: ConfigAPI,
  ): TransformOptions =>
  {
    api.cache.invalidate(
      () => process.env.NODE_ENV,
    );

    return transformOptions;
  };

  return createConfigItem(
    configFunction,
    {
      dirname: context.cwd,
      type: "preset",
    },
  );
}
