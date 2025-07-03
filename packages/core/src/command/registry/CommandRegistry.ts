import type { CommandRegistryAsync } from "./CommandRegistryAsync";
import type { CommandRegistrySync } from "./CommandRegistrySync";

export type CommandRegistry = (
  & CommandRegistryAsync
  & CommandRegistrySync
);
