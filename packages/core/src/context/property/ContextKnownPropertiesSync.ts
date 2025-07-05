import type { ExtensionRegistrySync } from "../../extension/registry/ExtensionRegistrySync";
import type { HookRegistrySync } from "../../hook/registry/HookRegistrySync";

import type { ContextKnownPropertiesBase } from "./ContextKnownPropertiesBase";

export type ContextKnownPropertiesSync = (
  & Omit<ContextKnownPropertiesBase, "sync">
  & {
    extensions: ExtensionRegistrySync;
    hooks: HookRegistrySync;
    sync: true;
  }
);
