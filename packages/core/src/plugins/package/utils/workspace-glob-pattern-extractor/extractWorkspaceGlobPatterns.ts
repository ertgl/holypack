import type { Optional } from "../../../../lib/object/Optional";
import type { PackageJSON } from "../../models/PackageJSON";

export function extractWorkspaceGlobPatterns(
  packageJSON: Optional<PackageJSON>,
): string[]
{
  if (!packageJSON?.workspaces)
  {
    return [];
  }

  return packageJSON.workspaces as string[];
}
