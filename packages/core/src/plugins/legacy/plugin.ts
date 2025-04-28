import type { TypeSafeConfig } from "../../config";
import type { TypeSafeContext } from "../../context";
import type { Plugin } from "../../extension";

export const PLUGIN_NAME_LEGACY = "@holypack/core:Legacy";

export class LegacyPlugin implements Plugin
{
  name = PLUGIN_NAME_LEGACY;

  resolveConfig(
    context: TypeSafeContext,
    config: TypeSafeConfig,
  ): void
  {
    context.legacy ??= config.legacy ?? false;
  }
}

export function createLegacyPlugin(): LegacyPlugin
{
  return new LegacyPlugin();
}
