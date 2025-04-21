import type {
  ESLintIntegrationGlobalsPluginOptions,
  ESLintIntegrationGlobalsPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationGlobalsPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationGlobalsPluginOptions | null,
): ESLintIntegrationGlobalsPluginResolvedOptions | false
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
