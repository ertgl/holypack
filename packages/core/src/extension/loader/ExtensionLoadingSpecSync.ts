import type { PathLike } from "../../lib/path/PathLike";
import type { ExtensionFactorySync } from "../factory/ExtensionFactorySync";

import type { ExtensionLoadingArraySpecSync } from "./ExtensionLoadingArraySpecSync";
import type { ExtensionLoadingArraySpecWithOptionsSync } from "./ExtensionLoadingArraySpecWithOptionsSync";

export type ExtensionLoadingSpecSync = (
  | ExtensionFactorySync
  | ExtensionLoadingArraySpecSync
  | ExtensionLoadingArraySpecWithOptionsSync
  | PathLike
);
