import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationPresetTypeScriptOptions } from "../options/BabelIntegrationPresetTypeScriptOptions";

import { BabelIntegrationPresetTypeScript } from "./BabelIntegrationPresetTypeScript";

export function createBabelIntegrationPresetTypeScript(
  options?: Optional<BabelIntegrationPresetTypeScriptOptions>,
): BabelIntegrationPresetTypeScript
{
  return new BabelIntegrationPresetTypeScript(options);
}
