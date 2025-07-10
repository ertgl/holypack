import type { UpwardGlobPathFinderOptionsSync } from "@holypack/core/lib/path/upward-glob-finder/UpwardGlobPathFinderOptionsSync";

import type { BabelConfigFilePathFinderOptionsBase } from "./BabelConfigFilePathFinderOptionsBase";

export type BabelConfigFilePathFinderOptionsSync = (
  & BabelConfigFilePathFinderOptionsBase
  & Omit<
    UpwardGlobPathFinderOptionsSync,
    (
      | "directoryOnly"
      | "fileOnly"
    )
  >
);
