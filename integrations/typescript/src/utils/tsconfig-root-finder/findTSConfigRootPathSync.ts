import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";
import { findPathUpwardGlobSync } from "@holypack/core/lib/path/upward-glob-finder/findPathUpwardGlobSync";

import type { TSConfigRootPathFinderOptionsSync } from "./TSConfigRootPathFinderOptionsSync";

export function findTSConfigRootPathSync(
  options?: Optional<TSConfigRootPathFinderOptionsSync>,
): null | Path
{
  const result = findPathUpwardGlobSync(
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
