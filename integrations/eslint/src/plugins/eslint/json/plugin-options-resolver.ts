import type {
  ESLintIntegrationESLintJSONPluginOptions,
  ESLintIntegrationESLintJSONPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationESLintJSONPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationESLintJSONPluginOptions | null,
): ESLintIntegrationESLintJSONPluginResolvedOptions | false
{
  if (!options)
  {
    return false;
  }

  const optionsObject = (
    typeof options === "object"
      ? options
      : {}
  );

  return {
    ...optionsObject,
  };
}
