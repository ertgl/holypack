import type { HookRegistryAsync } from "./HookRegistryAsync";
import type { HookRegistrySync } from "./HookRegistrySync";

export type HookRegistry = (
  & HookRegistryAsync
  & HookRegistrySync
);
