import type { HookRegistry } from "../../hook/registry/HookRegistry";
import type { Optional } from "../../lib/object/Optional";
import type { ExtensionUID } from "../uid/ExtensionUID";

export type ExtensionKnownPropertiesBase = {
  $hooks?: Optional<HookRegistry>;
  $uid: ExtensionUID;
};
