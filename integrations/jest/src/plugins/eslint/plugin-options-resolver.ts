import {
  JEST_INTEGRATION_ESLINT_PLUGIN_DEFAULT_ROOTS,
  JEST_INTEGRATION_ESLINT_PLUGIN_DEFAULT_TEST_MATCH,
  type JestIntegrationESLintPluginOptions,
  type JestIntegrationESLintPluginResolvedOptions,
} from "./plugin-options";

export function resolveJestIntegrationESLintPluginOptions(
  cwd: string,
  options?: boolean | JestIntegrationESLintPluginOptions | null,
): false | JestIntegrationESLintPluginResolvedOptions
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

  const roots = (
    optionsObject.roots
    ?? []
  );

  const finalRoots = (
    roots.length > 0
      ? roots
      : JEST_INTEGRATION_ESLINT_PLUGIN_DEFAULT_ROOTS
  );

  const testMatch = (
    optionsObject.testMatch
    ?? []
  );

  const finalTestMatch = (
    testMatch.length > 0
      ? testMatch
      : JEST_INTEGRATION_ESLINT_PLUGIN_DEFAULT_TEST_MATCH
  );

  return {
    ...optionsObject,
    roots: finalRoots,
    testMatch: finalTestMatch,
  };
}
