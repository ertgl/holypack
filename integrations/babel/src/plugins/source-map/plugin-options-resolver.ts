import type {
  BabelIntegrationSourceMapPluginOptions,
  BabelIntegrationSourceMapPluginResolvedOptions,
} from "./plugin-options";

export function resolveBabelIntegrationSourceMapPluginOptions(
  cwd: string,
  isLegacy: boolean,
  options?: BabelIntegrationSourceMapPluginOptions | boolean | null,
): BabelIntegrationSourceMapPluginResolvedOptions | false
{
  if (options === false)
  {
    return false;
  }

  return {
    isEnabled: true,
  };
}
