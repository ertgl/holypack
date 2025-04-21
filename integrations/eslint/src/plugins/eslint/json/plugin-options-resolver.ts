import type {
  ESLintIntegrationESLintJSONPluginOptions,
  ESLintIntegrationESLintJSONPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationESLintJSONPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationESLintJSONPluginOptions | null,
): ESLintIntegrationESLintJSONPluginResolvedOptions | false
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

  return {
    ...optionsObject,
  };
}
