import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";
import type { ExtensionFactoryOptions } from "../factory/ExtensionFactoryOptions";
import type { ExtensionFactorySync } from "../factory/ExtensionFactorySync";

export type ExtensionLoadingArraySpecWithOptionsSync = readonly [
  ExtensionFactorySync | PathLike,
  Optional<ExtensionFactoryOptions>,
];
