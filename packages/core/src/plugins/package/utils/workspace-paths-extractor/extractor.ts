import type { PathLike } from "../../../../fs";
import { glob } from "../../../../fs/glob";

import type { WorkspacePathsExtractorOptions } from "./options";

export async function getWorkspacePathsByGlobPatterns(
  cwd: PathLike,
  patterns: string[],
  options?: null | WorkspacePathsExtractorOptions,
): Promise<string[]>
{
  options ??= {};

  return await Array.fromAsync(
    glob(
      cwd,
      patterns,
      {
        fs: options.fs,
        onlyDirectories: true,
      },
    ),
    (entry) => entry.path,
  );
}
