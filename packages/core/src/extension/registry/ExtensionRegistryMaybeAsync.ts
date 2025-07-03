import type { ExtensionMaybeAsync } from "../ExtensionMaybeAsync";
import type { ExtensionUID } from "../uid/ExtensionUID";

export type ExtensionRegistryMaybeAsync = Map<ExtensionUID, ExtensionMaybeAsync>;
