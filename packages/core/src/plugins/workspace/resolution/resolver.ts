import { resolveCWD } from "../../../utils/process/cwd";
import { requirePackageJSONByDirectoryPath } from "../../package/utils/package-json-loader";
import type { ResolvedWorkspace } from "../workspace";

import type { WorkspaceResolutionOptions } from "./options";

export function resolveWorkspace(
  options?: WorkspaceResolutionOptions,
): ResolvedWorkspace
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const packageJSON = (
    options.packageJSON
    ?? requirePackageJSONByDirectoryPath(cwd)
  );

  return {
    name: packageJSON.name as string,
    packageJSON,
    path: cwd,
  };
}
