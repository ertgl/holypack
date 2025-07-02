import type { PathLike } from "../../lib/path/PathLike";
import type { ExtensionFactoryMaybeAsync } from "../factory/ExtensionFactoryMaybeAsync";

import type { ExtensionLoadingArraySpecAsync } from "./ExtensionLoadingArraySpecAsync";
import type { ExtensionLoadingArraySpecWithOptionsAsync } from "./ExtensionLoadingArraySpecWithOptionsAsync";

export type ExtensionLoadingSpecAsync = (
  | ExtensionFactoryMaybeAsync
  | ExtensionLoadingArraySpecAsync
  | ExtensionLoadingArraySpecWithOptionsAsync
  | PathLike
);
