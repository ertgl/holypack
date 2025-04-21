import type {
  ESLintIntegrationImportXPluginOptions,
  ESLintIntegrationImportXPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationImportXPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationImportXPluginOptions | null,
): ESLintIntegrationImportXPluginResolvedOptions | false
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

  const internalPattern = optionsObject.internalPattern ?? null;

  const internalPatternSource = (
    internalPattern instanceof RegExp
      ? internalPattern.source
      : internalPattern
  );

  return {
    ...optionsObject,
    internalPatternSource,
  };
}
