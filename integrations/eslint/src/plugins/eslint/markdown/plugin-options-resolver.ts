import type {
  ESLintIntegrationESLintMarkdownPluginOptions,
  ESLintIntegrationESLintMarkdownPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationESLintMarkdownPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationESLintMarkdownPluginOptions | null,
): ESLintIntegrationESLintMarkdownPluginResolvedOptions | false
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
