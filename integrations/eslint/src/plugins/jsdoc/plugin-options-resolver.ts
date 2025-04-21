import type {
  ESLintIntegrationJSDocPluginOptions,
  ESLintIntegrationJSDocPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationJSDocPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationJSDocPluginOptions | null,
): ESLintIntegrationJSDocPluginResolvedOptions | false
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
