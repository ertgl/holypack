import type { ExtensionLoadingSpecAsync } from "./ExtensionLoadingSpecAsync";
import type { ExtensionLoadingSpecSync } from "./ExtensionLoadingSpecSync";

export type ExtensionLoadingSpec = (
  | ExtensionLoadingSpecAsync
  | ExtensionLoadingSpecSync
);
