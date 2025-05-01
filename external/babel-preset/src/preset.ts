import {
  type ConfigItem,
  createConfigItem,
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

  const configFunction = await integration.api.generateConfigFunction(
    context as unknown as StrictContext,
  );

  return createConfigItem(
    configFunction,
    {
      dirname: context.cwd,
      type: "preset",
    },
  );
}
