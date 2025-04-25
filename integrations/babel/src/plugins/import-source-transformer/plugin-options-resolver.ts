import type {
  BabelIntegrationImportSourceTransformerPluginOptions,
  BabelIntegrationImportSourceTransformerPluginResolvedOptions,
} from "./plugin-options";

export function resolveBabelIntegrationImportSourceTransformerPluginOptions(
  cwd: string,
  options?: BabelIntegrationImportSourceTransformerPluginOptions | boolean | null,
): BabelIntegrationImportSourceTransformerPluginResolvedOptions | false
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
    overrides: {
      ...overrides,
    },
  };
}
