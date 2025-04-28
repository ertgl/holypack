import escapeRegExp from "lodash.escaperegexp";

import type { ResolvedWorkspace } from "@holypack/core/plugins/workspace";

import type {
  ESLintIntegrationImportXPluginOptions,
  ESLintIntegrationImportXPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationImportXPluginOptions(
  cwd: string,
  workspaces: Iterable<ResolvedWorkspace>,
  options?: boolean | ESLintIntegrationImportXPluginOptions | null,
): ESLintIntegrationImportXPluginResolvedOptions | false
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

  const internalPattern = optionsObject.internalPattern ?? null;

  const internalPatternSource = (
    internalPattern instanceof RegExp
      ? internalPattern.source
      : internalPattern
  );

  let finalInternalPatternSource = "";
  let operator = "";

  if (internalPatternSource)
  {
    finalInternalPatternSource += `(?:${internalPatternSource})`;
    operator = "|";
  }

  for (const workspace of workspaces)
  {
    const workspaceNameRegexp = escapeRegExp(workspace.name);
    finalInternalPatternSource += `${operator}(?:^${workspaceNameRegexp}(?:[\\/]+.*)?$)`;
    operator = "|";
  }

  return {
    ...optionsObject,
    internalPatternSource: finalInternalPatternSource,
  };
}
