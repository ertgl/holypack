import {
  access as accessPath,
  type PathLike,
} from "node:fs";

import type { FileSystem } from "./file-system";

export type PathExistenceCheckerFS = {
  access?: FileSystem["access"] | null;
};

export type PathExistenceCheckerOptions = {
  fs?: null | PathExistenceCheckerFS;
};

export async function checkIfPathExists(
  path: PathLike,
  mode?: null | number,
  options?: null | PathExistenceCheckerOptions,
): Promise<boolean>
{
  options ??= {};

  const access = options.fs?.access ?? accessPath;

  return new Promise<boolean>(
    (resolve) =>
    {
      access(
        path,
        mode ?? undefined,
        (err) =>
        {
          resolve(!err);
        },
      );
    },
  );
}
