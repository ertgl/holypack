import { resolveCWD } from "../../cwd/api";
import { requirePackageJSONByDirectoryPath } from "../../package/api";
import { findRepositoryRootPath } from "../api";
import type { ResolvedRepository } from "../repository";

import type { RepositoryResolutionOptions } from "./options";

export async function resolveRepository(
  options?: null | RepositoryResolutionOptions,
): Promise<ResolvedRepository>
{
  options ??= {};

  const repositoryConfig = options.repository ?? {};

  let path = repositoryConfig.path;
  if (!path)
  {
    path = await findRepositoryRootPath({
      cwd: resolveCWD(options.cwd),
    });
  }

  // TODO(ertgl): Create project plugin and move packageJSON resolution there.
  const packageJSON = requirePackageJSONByDirectoryPath(path);

  return {
    packageJSON,
    path,
  };
}
