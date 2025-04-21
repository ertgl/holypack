import type {
  ESLintIntegrationGlobalsPluginOptions,
  ESLintIntegrationGlobalsPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationGlobalsPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationGlobalsPluginOptions | null,
): ESLintIntegrationGlobalsPluginResolvedOptions | false
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
