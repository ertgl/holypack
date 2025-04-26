import {
  access as accessPath,
  type PathLike,
} from "node:fs";

import type { PathExistenceCheckerOptions } from "./options";

export async function checkIfPathExists(
  path: PathLike,
  options?: null | PathExistenceCheckerOptions,
): Promise<boolean>
{
  options ??= {};

  const access = options.fs?.access ?? accessPath;
  const mode = options.accessMode ?? undefined;

  return new Promise<boolean>(
    (resolve) =>
    {
      access(
        path,
        mode,
        (err) =>
        {
          resolve(!err);
        },
      );
    },
  );
}
