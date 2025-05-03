import type { StrictConfig } from "../../../config";
import type { StrictContext } from "../../../context";
import type { Plugin } from "../../../extension";
import { PLUGIN_NAME_LEGACY } from "../plugin-metadata";

export class LegacyPlugin implements Plugin
{
  name = PLUGIN_NAME_LEGACY;

  resolveConfig(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    context.legacy ??= config.legacy ?? false;
  }
}

export function createLegacyPlugin(): LegacyPlugin
{
  return new LegacyPlugin();
}
