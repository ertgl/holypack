import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { patchDefined } from "@holypack/core/lib/object/patchDefined";
import { absolutifyPath } from "@holypack/core/lib/path/absolutifyPath";
import type { Path } from "@holypack/core/lib/path/Path";

import type { BabelConfigFilePathFinderOptionsAsync } from "../../utils/config-file-path-finder/BabelConfigFilePathFinderOptionsAsync";
import type { BabelConfigFilePathFinderOptionsSync } from "../../utils/config-file-path-finder/BabelConfigFilePathFinderOptionsSync";
import { findBabelConfigFilePathAsync } from "../../utils/config-file-path-finder/findBabelConfigFilePathAsync";
import { findBabelConfigFilePathSync } from "../../utils/config-file-path-finder/findBabelConfigFilePathSync";

export class BabelConfigFilePathFinderFacet
{
  async find(
    context: ContextAsync,
    options?: Optional<BabelConfigFilePathFinderOptionsAsync>,
  ): Promise<null | Path>
  {
    options ??= {};

    const cwd = absolutifyPath(
      context.cwd,
      options.cwd,
    );

    return await findBabelConfigFilePathAsync({
      ...options,
      cwd,
      fs: patchDefined(
        context.fs,
        options.fs,
      ),
    });
  }

  findSync(
    context: ContextSync,
    options?: Optional<BabelConfigFilePathFinderOptionsSync>,
  ): null | Path
  {
    options ??= {};

    const cwd = absolutifyPath(
      context.cwd,
      options.cwd,
    );

    return findBabelConfigFilePathSync({
      ...options,
      cwd,
      fs: patchDefined(
        context.fs,
        options.fs,
      ),
    });
  }
}
