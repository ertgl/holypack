import type { PackageJSON } from "../../../package-json";

export function extractWorkspaceGlobPatternsFromPackageJSON(
  packageJSON: PackageJSON,
): string[]
{
  return (packageJSON.workspaces ?? []) as string[];
}
