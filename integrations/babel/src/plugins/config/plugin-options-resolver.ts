import type {
  BabelIntegrationConfigPluginOptions,
  BabelIntegrationConfigPluginResolvedOptions,
} from "./plugin-options";

export function resolveBabelIntegrationConfigPluginOptions(
  cwd: string,
  isLegacy: boolean,
  options?: BabelIntegrationConfigPluginOptions | boolean | null,
): BabelIntegrationConfigPluginResolvedOptions | false
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

  return {
    ...optionsObject,
    overrides: {
      ...overrides,
      cwd: overrides.cwd ?? cwd,
      sourceMaps: overrides.sourceMaps ?? true,
      sourceType: overrides.sourceType ?? "unambiguous",
      targets: (
        overrides.targets
        ?? {
          esmodules: !isLegacy,
        }
      ),
    },
  };
}
