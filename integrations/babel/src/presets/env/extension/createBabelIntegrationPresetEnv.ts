import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationPresetEnvOptions } from "../options/BabelIntegrationPresetEnvOptions";

import { BabelIntegrationPresetEnv } from "./BabelIntegrationPresetEnv";

export function createBabelIntegrationPresetEnv(
  options?: Optional<BabelIntegrationPresetEnvOptions>,
): BabelIntegrationPresetEnv
{
  return new BabelIntegrationPresetEnv(options);
}
