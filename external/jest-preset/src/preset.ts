import type { Config } from "jest";

import {
  requireIntegration,
  resolveContext,
  type StrictContext,
} from "@holypack/core";
import {
  INTEGRATION_NAME_JEST,
  JestIntegration,
} from "@holypack/integration-jest";

import type { HolypackPresetOptions } from "./preset-options";

export type HolypackPreset = Config;

export async function createHolypackPreset(
  options?: HolypackPresetOptions | null,
): Promise<HolypackPreset>
{
  options ??= {};

  const context = await resolveContext(options.context);

  const integration = requireIntegration<JestIntegration>(
    context as unknown as StrictContext,
    INTEGRATION_NAME_JEST,
  );

  return await integration.api.generateJestConfig(context);
}
