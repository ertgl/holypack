// eslint-disable-next-line n/no-unsupported-features/node-builtins
import type { glob as GlobFunction } from "node:fs";
import { dirname } from "node:path";

import * as fastGlob from "fast-glob";
import type {
  Entry,
  FileSystemAdapter,
} from "fast-glob";
import type { IFs } from "memfs";

import type { Dirent } from "../../../dirent/Dirent";

export function globAsync(
  fs: IFs,
  patterns: Parameters<typeof GlobFunction>[0],
  options: Parameters<typeof GlobFunction>[1],
  callback: Parameters<typeof GlobFunction>[2],
): void
{
  fastGlob.default.glob(
    patterns,
    {
      absolute: true,
      cwd: options.cwd,
      fs: fs as unknown as FileSystemAdapter,
      ignore: options.exclude as string[] | undefined,
      objectMode: options.withFileTypes,
    },
  ).then(
    (result) =>
    {
      if (options.withFileTypes)
      {
        callback(
          null,
          (result as unknown as Entry[]).map(
            (entry) =>
            {
              (entry.dirent as Dirent<string>).parentPath = dirname(entry.path);
              return entry.dirent;
            },
          ) as unknown as Dirent<string>[],
        );
      }
      else
      {
        callback(
          null,
          result,
        );
      }
    },
  ).catch(
    (
      err: unknown,
    ) =>
    {
      callback(
        err as Error,
        [],
      );
    },
  );
}
