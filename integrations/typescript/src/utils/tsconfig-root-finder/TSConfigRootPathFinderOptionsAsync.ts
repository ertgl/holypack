import type { UpwardGlobPathFinderOptionsAsync } from "@holypack/core/lib/path/upward-glob-finder/UpwardGlobPathFinderOptionsAsync";

export type TSConfigRootPathFinderOptionsAsync = (
  & Omit<
    UpwardGlobPathFinderOptionsAsync,
    (
      | "directoryOnly"
      | "fileOnly"
    )
  >
);
