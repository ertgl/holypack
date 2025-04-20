import type {
  ESLintIntegrationESLintJSPluginOptions,
  ESLintIntegrationESLintJSPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationESLintJSPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationESLintJSPluginOptions | null,
): ESLintIntegrationESLintJSPluginResolvedOptions | false
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
