import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";
import { findPathUpwardGlobAsync } from "@holypack/core/lib/path/upward-glob-finder/findPathUpwardGlobAsync";

import type { BabelConfigFilePathFinderOptionsAsync } from "./BabelConfigFilePathFinderOptionsAsync";
import { getDefaultBabelConfigFilePathGlobPatterns } from "./getDefaultBabelConfigFilePathGlobPatterns";

export async function findBabelConfigFilePathAsync(
  options?: Optional<BabelConfigFilePathFinderOptionsAsync>,
): Promise<null | Path>
{
  options ??= {};

  const globPatterns = (
    options.globPatterns
    ?? getDefaultBabelConfigFilePathGlobPatterns()
  );

  const result = await findPathUpwardGlobAsync(
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
