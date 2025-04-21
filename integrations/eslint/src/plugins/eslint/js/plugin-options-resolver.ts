import type {
  ESLintIntegrationESLintJSPluginOptions,
  ESLintIntegrationESLintJSPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationESLintJSPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationESLintJSPluginOptions | null,
): ESLintIntegrationESLintJSPluginResolvedOptions | false
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
