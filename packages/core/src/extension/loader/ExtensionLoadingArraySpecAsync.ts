import type { PathLike } from "../../lib/path/PathLike";
import type { ExtensionFactoryMaybeAsync } from "../factory/ExtensionFactoryMaybeAsync";

export type ExtensionLoadingArraySpecAsync = readonly [
  ExtensionFactoryMaybeAsync | PathLike,
];
