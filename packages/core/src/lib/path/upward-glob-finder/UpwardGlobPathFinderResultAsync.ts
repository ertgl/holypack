import type { UpwardGlobPathFinderResultFoundAsync } from "./UpwardGlobPathFinderResultFoundAsync";
import type { UpwardGlobPathFinderResultNotFound } from "./UpwardGlobPathFinderResultNotFound";

export type UpwardGlobPathFinderResultAsync = (
  | UpwardGlobPathFinderResultFoundAsync
  | UpwardGlobPathFinderResultNotFound
);
