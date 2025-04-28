import type {
  JestIntegrationESLintPluginOptions,
  JestIntegrationESLintPluginResolvedOptions,
} from "./plugin-options";

export function resolveJestIntegrationESLintPluginOptions(
  cwd: string,
  options?: boolean | JestIntegrationESLintPluginOptions | null,
): false | JestIntegrationESLintPluginResolvedOptions
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

  return optionsObject;
}
