import type {
  ESLintIntegrationJSONPluginOptions,
  ESLintIntegrationJSONPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationJSONPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationJSONPluginOptions | null,
): ESLintIntegrationJSONPluginResolvedOptions | false
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
