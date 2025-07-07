import type { Optional } from "../../object/Optional";
import type { PathLike } from "../PathLike";
import type { RootPathFinderStrategy } from "../rooter/RootPathFinderStrategy";

export type UpwardGlobPathFinderOptionsBase = {
  cwd?: Optional<PathLike>;
  directoryOnly?: Optional<boolean>;
  fileOnly?: Optional<boolean>;
  strategy?: Optional<RootPathFinderStrategy>;
};
