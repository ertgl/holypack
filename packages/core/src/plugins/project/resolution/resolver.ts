import { resolveCWD } from "../../../lib/process/cwd";
import { requirePackageJSONByDirectoryPath } from "../../package/utils/package-json-loader";
import type { ResolvedProject } from "../project";
import { findProjectRootPath } from "../utils/project-root-path-finder";

import type { ProjectResolutionOptions } from "./options";

export async function resolveProject(
  options?: null | ProjectResolutionOptions,
): Promise<ResolvedProject>
{
  options ??= {};

  const projectConfig = options.project ?? {};

  let path = projectConfig.path;
  if (!path)
  {
    path = await findProjectRootPath({
      cwd: resolveCWD(options.cwd),
    });
  }

  const packageJSON = requirePackageJSONByDirectoryPath(path);

  return {
    packageJSON,
    path,
  };
}
