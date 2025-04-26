import {
  type ConfigItem,
  createConfigItem,
} from "@babel/core";

import {
  requireIntegration,
  resolveContext,
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
    context,
    INTEGRATION_NAME_BABEL,
  );

  const configFunction = await integration.api.generateConfigFunction(
    context,
  );

  return createConfigItem(
    configFunction,
    {
      dirname: context.cwd,
      type: "preset",
    },
  );
}
