// eslint-disable-next-line n/no-unsupported-features/node-builtins
import type { globSync as GlobSyncFunction } from "node:fs";
import { dirname } from "node:path";

import * as fastGlob from "fast-glob";
import type {
  Entry,
  FileSystemAdapter,
} from "fast-glob";
import type { IFs } from "memfs";

import { resolveCWD } from "../../../../process/cwd/resolveCWD";
import type { Dirent } from "../../../dirent/Dirent";

export function globSync<
  T_ReturnType extends ReturnType<typeof GlobSyncFunction> = ReturnType<typeof GlobSyncFunction>,
>(
  fs: IFs,
  patterns: Parameters<typeof GlobSyncFunction>[0],
  options?: null | Parameters<typeof GlobSyncFunction>[1],
): T_ReturnType
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const result = fastGlob.default.globSync(
    patterns as (string | string[]),
    {
      absolute: true,
      cwd,
      fs: fs as unknown as FileSystemAdapter,
      ignore: options.exclude as string[] | undefined,
      objectMode: options.withFileTypes,
    },
  );

  if (options.withFileTypes)
  {
    return (result as unknown as Entry[]).map(
      (entry) =>
      {
        (entry.dirent as Dirent).parentPath = dirname(entry.path);
        return entry.dirent;
      },
    ) as T_ReturnType;
  }

  return result as T_ReturnType;
}
