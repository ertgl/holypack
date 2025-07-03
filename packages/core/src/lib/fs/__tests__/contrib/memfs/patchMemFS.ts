import type { IFs } from "memfs";

import { globAsync } from "./globAsync";
import { globSync } from "./globSync";
import type { PatchedMemFS } from "./PatchedMemFS";

export function patchMemFS(
  fs: IFs,
): PatchedMemFS
{
  return {
    ...fs,
    glob: globAsync.bind(null, fs),
    globSync: globSync.bind(null, fs),
  } as unknown as PatchedMemFS;
}
