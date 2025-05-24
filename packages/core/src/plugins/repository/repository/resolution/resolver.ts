import { resolveCWD } from "../../../../lib/process/cwd";
import type { ResolvedRepository } from "../../repository";
import { findRepositoryRootPath } from "../../utils/repository-root-path-finder";

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

  return {
    path,
  };
}
