import type { ExtensionMaybeAsync } from "./ExtensionMaybeAsync";
import type { ExtensionSync } from "./ExtensionSync";

export type Extension = (
  | ExtensionMaybeAsync
  | ExtensionSync
);
