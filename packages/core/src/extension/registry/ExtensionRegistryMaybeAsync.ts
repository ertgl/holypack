import type { ExtensionMaybeAsync } from "../ExtensionMaybeAsync";
import type { ExtensionUID } from "../uid/ExtensionUID";

// TODO(ertgl): Rename `ExtensionRegistryMaybeAsync` type as `ExtensionRegistryAsync`.
export type ExtensionRegistryMaybeAsync = Map<ExtensionUID, ExtensionMaybeAsync>;
