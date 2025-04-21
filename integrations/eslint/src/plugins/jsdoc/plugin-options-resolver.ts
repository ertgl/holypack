import type {
  ESLintIntegrationJSDocPluginOptions,
  ESLintIntegrationJSDocPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationJSDocPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationJSDocPluginOptions | null,
): ESLintIntegrationJSDocPluginResolvedOptions | false
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
