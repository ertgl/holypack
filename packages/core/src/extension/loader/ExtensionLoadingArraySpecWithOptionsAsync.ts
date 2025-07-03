import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";
import type { ExtensionFactoryMaybeAsync } from "../factory/ExtensionFactoryMaybeAsync";
import type { ExtensionFactoryOptions } from "../factory/ExtensionFactoryOptions";

export type ExtensionLoadingArraySpecWithOptionsAsync = readonly [
  ExtensionFactoryMaybeAsync | PathLike,
  Optional<ExtensionFactoryOptions>,
];
