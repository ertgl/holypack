import type { CommandRegistryAsync } from "../../command/registry/CommandRegistryAsync";
import type { ExtensionRegistryMaybeAsync } from "../../extension/registry/ExtensionRegistryMaybeAsync";
import type { HookRegistryAsync } from "../../hook/registry/HookRegistryAsync";

import type { ContextKnownPropertiesBase } from "./ContextKnownPropertiesBase";

export type ContextKnownPropertiesAsync = (
  & Omit<ContextKnownPropertiesBase, "sync">
  & {
    commands: CommandRegistryAsync;
    extensions: ExtensionRegistryMaybeAsync;
    hooks: HookRegistryAsync;
    sync: false;
  }
);
