import type {
  ESLintIntegrationTypeScriptPluginOptions,
  ESLintIntegrationTypeScriptPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationTypeScriptPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationTypeScriptPluginOptions | null,
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

  // TODO(ertgl): Consider creating a plugin for workspaces.
  // TODO(ertgl): Use `@holypack/core/utils/fs/root-path-finder` for tsconfigRootDir resolution.
  const tsconfigRootDir = (
    optionsObject.tsconfigRootDir
    ?? cwd
  );

  return {
    ...optionsObject,
    tsconfigRootDir,
  };
}
