import type { CommandAsync } from "../CommandAsync";
import type { CommandUID } from "../uid/CommandUID";

export type CommandRegistryAsync = Map<CommandUID, CommandAsync>;
