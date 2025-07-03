import type { CommandSync } from "../CommandSync";
import type { CommandUID } from "../uid/CommandUID";

export type CommandRegistrySync = Map<CommandUID, CommandSync>;
