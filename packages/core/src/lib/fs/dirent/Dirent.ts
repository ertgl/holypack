import type { Dirent as Dirent_ } from "node:fs";

export type Dirent<
  T extends Buffer | string = Buffer | string,
> = Dirent_<T>;
