import type { UpwardGlobPathFinderOptionsAsync } from "@holypack/core/lib/path/upward-glob-finder/UpwardGlobPathFinderOptionsAsync";

import type { BabelConfigFilePathFinderOptionsBase } from "./BabelConfigFilePathFinderOptionsBase";

export type BabelConfigFilePathFinderOptionsAsync = (
  & BabelConfigFilePathFinderOptionsBase
  & Omit<
    UpwardGlobPathFinderOptionsAsync,
    (
      | "directoryOnly"
      | "fileOnly"
    )
  >
);
