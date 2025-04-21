import type {
  ESLintIntegrationImportXPluginOptions,
  ESLintIntegrationImportXPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationImportXPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationImportXPluginOptions | null,
): ESLintIntegrationImportXPluginResolvedOptions | false
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

  const internalRegex = (
    optionsObject.internalRegex ?? null
  );

  const internalRegexSource = (
    internalRegex instanceof RegExp
      ? internalRegex.source
      : internalRegex
  );

  return {
    ...optionsObject,
    internalRegexSource,
  };
}
