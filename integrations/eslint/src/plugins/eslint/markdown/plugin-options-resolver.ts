import type {
  ESLintIntegrationESLintMarkdownPluginOptions,
  ESLintIntegrationESLintMarkdownPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationESLintMarkdownPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationESLintMarkdownPluginOptions | null,
): ESLintIntegrationESLintMarkdownPluginResolvedOptions | false
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
