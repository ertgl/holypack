import type {
  ESLintIntegrationNPluginOptions,
  ESLintIntegrationNPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationNPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationNPluginOptions | null,
): ESLintIntegrationNPluginResolvedOptions | false
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
