import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";
import { findPathUpwardGlobSync } from "@holypack/core/lib/path/upward-glob-finder/findPathUpwardGlobSync";

import type { BabelConfigFilePathFinderOptionsSync } from "./BabelConfigFilePathFinderOptionsSync";
import { getDefaultBabelConfigFilePathGlobPatterns } from "./getDefaultBabelConfigFilePathGlobPatterns";

export function findBabelConfigFilePathSync(
  options?: Optional<BabelConfigFilePathFinderOptionsSync>,
): null | Path
{
  options ??= {};

  const globPatterns = (
    options.globPatterns
    ?? getDefaultBabelConfigFilePathGlobPatterns()
  );

  const result = findPathUpwardGlobSync(
    globPatterns,
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
