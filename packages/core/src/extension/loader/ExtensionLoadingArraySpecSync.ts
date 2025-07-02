import type { PathLike } from "../../lib/path/PathLike";
import type { ExtensionFactorySync } from "../factory/ExtensionFactorySync";

export type ExtensionLoadingArraySpecSync = readonly [
  ExtensionFactorySync | PathLike,
];
