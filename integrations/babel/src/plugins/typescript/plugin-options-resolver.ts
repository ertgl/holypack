import type {
  BabelIntegrationTypeScriptPluginOptions,
  BabelIntegrationTypeScriptPluginResolvedOptions,
} from "./plugin-options";

export function resolveBabelIntegrationTypeScriptPluginOptions(
  cwd: string,
  isLegacy: boolean,
  options?: BabelIntegrationTypeScriptPluginOptions | boolean | null,
): BabelIntegrationTypeScriptPluginResolvedOptions | false
{
  if (options === false)
  {
    return false;
  }

  const optionsObject = (
    options === true
      ? {}
      : options ?? {}
  );

  const overrides = optionsObject.overrides ?? {};

  const dts = overrides.dts ?? true;

  return {
    overrides: {
      ...overrides,
      dts,
    },
  };
}
