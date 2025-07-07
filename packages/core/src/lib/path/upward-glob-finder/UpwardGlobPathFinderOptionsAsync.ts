import type { UpwardGlobPathFinderOptionsBase } from "./UpwardGlobPathFinderOptionsBase";
import type { UpwardGlobPathFinderOptionsFSTraitAsync } from "./UpwardGlobPathFinderOptionsFSTraitAsync";

export type UpwardGlobPathFinderOptionsAsync = (
  & UpwardGlobPathFinderOptionsBase
  & UpwardGlobPathFinderOptionsFSTraitAsync
);
