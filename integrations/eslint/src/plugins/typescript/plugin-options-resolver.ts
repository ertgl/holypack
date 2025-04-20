import type {
  ESLintIntegrationTypeScriptPluginOptions,
  ESLintIntegrationTypeScriptPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationTypeScriptPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationTypeScriptPluginOptions | null,
): ESLintIntegrationTypeScriptPluginResolvedOptions | false
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
