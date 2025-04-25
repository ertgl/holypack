import type {
  BabelIntegrationEnvPluginOptions,
  BabelIntegrationEnvPluginResolvedOptions,
} from "./plugin-options";

export function resolveBabelIntegrationEnvPluginOptions(
  cwd: string,
  isLegacy: boolean,
  options?: BabelIntegrationEnvPluginOptions | boolean | null,
): BabelIntegrationEnvPluginResolvedOptions | false
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

  const modules = (
    isLegacy
      ? "commonjs"
      : false
  );

  return {
    modules,
    overrides: {
      ...overrides,
    },
  };
}
