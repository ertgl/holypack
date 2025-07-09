import type { UpwardGlobPathFinderOptionsSync } from "@holypack/core/lib/path/upward-glob-finder/UpwardGlobPathFinderOptionsSync";

export type TSConfigRootPathFinderOptionsSync = (
  & Omit<
    UpwardGlobPathFinderOptionsSync,
    (
      | "directoryOnly"
      | "fileOnly"
    )
  >
);
