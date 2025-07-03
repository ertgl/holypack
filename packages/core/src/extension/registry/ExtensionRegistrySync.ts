import type { ExtensionSync } from "../ExtensionSync";
import type { ExtensionUID } from "../uid/ExtensionUID";

export type ExtensionRegistrySync = Map<ExtensionUID, ExtensionSync>;
