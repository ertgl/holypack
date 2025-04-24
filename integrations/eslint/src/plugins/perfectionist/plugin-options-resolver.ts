import escapeRegExp from "lodash.escaperegexp";

import type { WorkspaceRegistry } from "@holypack/core/plugins/workspace";

import type {
  ESLintIntegrationPerfectionistPluginOptions,
  ESLintIntegrationPerfectionistPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationPerfectionistPluginOptions(
  cwd: string,
  workspaces: WorkspaceRegistry,
  options?: boolean | ESLintIntegrationPerfectionistPluginOptions | null,
): ESLintIntegrationPerfectionistPluginResolvedOptions | false
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

  for (const workspace of workspaces.values())
  {
    const workspaceNameRegexp = escapeRegExp(workspace.name);
    internalPatternStringArray.push(`^(?:${workspaceNameRegexp})(?:[\\/]+.*)?$`);
  }

  return {
    ...optionsObject,
    internalPattern: internalPatternStringArray,
  };
}
