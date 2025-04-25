import type {
  ESLintIntegrationTypeScriptPluginOptions,
  ESLintIntegrationTypeScriptPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationTypeScriptPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationTypeScriptPluginOptions | null,
  defaults?: ESLintIntegrationTypeScriptPluginOptions | null,
): ESLintIntegrationTypeScriptPluginResolvedOptions | false
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

  defaults ??= {};

  const tsconfigRootDir = (
    optionsObject.tsconfigRootDir
    ?? defaults.tsconfigRootDir
    ?? cwd
  );

  const warnOnUnsupportedTypeScriptVersion = (
    optionsObject.warnOnUnsupportedTypeScriptVersion
    ?? defaults.warnOnUnsupportedTypeScriptVersion
    ?? false
  );

  return {
    ...optionsObject,
    tsconfigRootDir,
    warnOnUnsupportedTypeScriptVersion,
  };
}
