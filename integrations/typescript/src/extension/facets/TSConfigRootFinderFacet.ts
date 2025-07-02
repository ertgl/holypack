import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { absolutifyPath } from "@holypack/core/lib/path/absolutifyPath";
import type { Path } from "@holypack/core/lib/path/Path";
import type { PathLike } from "@holypack/core/lib/path/PathLike";

import { findTSConfigRootPathAsync } from "../../utils/tsconfig-root-finder/findTSConfigRootPathAsync";
import { findTSConfigRootPathSync } from "../../utils/tsconfig-root-finder/findTSConfigRootPathSync";

export class TSConfigRootFinderFacet
{
  async find(
    context: ContextAsync,
    cwdPathLike?: Optional<PathLike>,
  ): Promise<null | Path>
  {
    const cwd = absolutifyPath(
      context.cwd,
      cwdPathLike,
    );

    return await findTSConfigRootPathAsync({
      cwd,
      fs: context.fs,
    });
  }

  findSync(
    context: ContextSync,
    cwdPathLike?: Optional<PathLike>,
  ): null | Path
  {
    const cwd = absolutifyPath(
      context.cwd,
      cwdPathLike,
    );

    return findTSConfigRootPathSync({
      cwd,
      fs: context.fs,
    });
  }
}
