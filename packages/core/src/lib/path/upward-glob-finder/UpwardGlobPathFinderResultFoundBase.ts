import type { Path } from "../Path";

export type UpwardGlobPathFinderResultFoundBase = {
  found: true;
  path: Path;
  rootPath: Path;
};
