import type {
  ESLintIntegrationIgnoresPluginOptions,
  ESLintIntegrationIgnoresPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationIgnoresPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationIgnoresPluginOptions | null,
): ESLintIntegrationIgnoresPluginResolvedOptions | false
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

  const commonPatterns = optionsObject.commonPatterns ?? [];

  return {
    ...optionsObject,
    commonPatterns,
  };
}
