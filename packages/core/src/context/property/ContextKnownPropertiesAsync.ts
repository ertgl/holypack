import type { ExtensionRegistryMaybeAsync } from "../../extension/registry/ExtensionRegistryMaybeAsync";
import type { HookRegistryAsync } from "../../hook/registry/HookRegistryAsync";

import type { ContextKnownPropertiesBase } from "./ContextKnownPropertiesBase";

export type ContextKnownPropertiesAsync = (
  & Omit<ContextKnownPropertiesBase, "sync">
  & {
    extensions: ExtensionRegistryMaybeAsync;
    hooks: HookRegistryAsync;
    sync: false;
  }
);
