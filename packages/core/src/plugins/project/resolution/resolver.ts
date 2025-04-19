import { resolveCWD } from "../../../utils/process/cwd";
import { requirePackageJSONByDirectoryPath } from "../../package/utils/module";
import type { ResolvedProject } from "../project";
import { findProjectRootPath } from "../root-path-finder";

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
