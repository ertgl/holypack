import type { UpwardGlobPathFinderResultFoundSync } from "./UpwardGlobPathFinderResultFoundSync";
import type { UpwardGlobPathFinderResultNotFound } from "./UpwardGlobPathFinderResultNotFound";

export type UpwardGlobPathFinderResultSync = (
  | UpwardGlobPathFinderResultFoundSync
  | UpwardGlobPathFinderResultNotFound
);
