import type { UpwardGlobPathFinderOptionsBase } from "./UpwardGlobPathFinderOptionsBase";
import type { UpwardGlobPathFinderOptionsFSTraitSync } from "./UpwardGlobPathFinderOptionsFSTraitSync";

export type UpwardGlobPathFinderOptionsSync = (
  & UpwardGlobPathFinderOptionsBase
  & UpwardGlobPathFinderOptionsFSTraitSync
);
