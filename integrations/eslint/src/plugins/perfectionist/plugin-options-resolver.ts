import type {
  ESLintIntegrationPerfectionistPluginOptions,
  ESLintIntegrationPerfectionistPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationPerfectionistPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationPerfectionistPluginOptions | null,
): ESLintIntegrationPerfectionistPluginResolvedOptions | false
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

  const internalPattern = (
    optionsObject.internalPattern
    ?? []
  );

  const internalPatternArray = (
    Array.isArray(internalPattern)
      ? internalPattern
      : [internalPattern]
  );

  const internalPatternStringArray = internalPatternArray.map(
    (pattern) =>
    {
      return (
        pattern instanceof RegExp
          ? pattern.source
          : pattern
      );
    },
  );

  return {
    ...optionsObject,
    internalPattern: internalPatternStringArray,
  };
}
