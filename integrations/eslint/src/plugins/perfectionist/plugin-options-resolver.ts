import escapeRegExp from "lodash.escaperegexp";

import type { ResolvedWorkspace } from "@holypack/core/plugins/workspace";

import type {
  ESLintIntegrationPerfectionistPluginOptions,
  ESLintIntegrationPerfectionistPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationPerfectionistPluginOptions(
  cwd: string,
  workspaces: Iterable<ResolvedWorkspace>,
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

  const commentPatternsForPartition = (
    optionsObject.commentPatternsForPartition
    ?? []
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

  for (const workspace of workspaces)
  {
    const workspaceNameRegexp = escapeRegExp(workspace.name);
    internalPatternStringArray.push(`^(?:${workspaceNameRegexp})(?:[\\/]+.*)?$`);
  }

  return {
    ...optionsObject,
    commentPatternsForPartition,
    internalPattern: internalPatternStringArray,
  };
}
