import type {
  ESLintIntegrationNPluginOptions,
  ESLintIntegrationNPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationNPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationNPluginOptions | null,
): ESLintIntegrationNPluginResolvedOptions | false
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
