import type {
  ESLintIntegrationYMLPluginOptions,
  ESLintIntegrationYMLPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationYMLPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationYMLPluginOptions | null,
): ESLintIntegrationYMLPluginResolvedOptions | false
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
