import type {
  ESLintIntegrationYMLPluginOptions,
  ESLintIntegrationYMLPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationYMLPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationYMLPluginOptions | null,
): ESLintIntegrationYMLPluginResolvedOptions | false
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
