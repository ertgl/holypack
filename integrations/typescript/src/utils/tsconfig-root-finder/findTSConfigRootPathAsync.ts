import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";
import { findPathUpwardGlobAsync } from "@holypack/core/lib/path/upward-glob-finder/findPathUpwardGlobAsync";

import type { TSConfigRootPathFinderOptionsAsync } from "./TSConfigRootPathFinderOptionsAsync";

export async function findTSConfigRootPathAsync(
  options?: Optional<TSConfigRootPathFinderOptionsAsync>,
): Promise<null | Path>
{
  const result = await findPathUpwardGlobAsync(
    "tsconfig.json",
    {
      ...options,
      fileOnly: true,
    },
  );

  if (result.rootPath != null)
  {
    return result.rootPath;
  }

  return null;
}
