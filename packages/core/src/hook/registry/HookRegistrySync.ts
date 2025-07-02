import type { AnyHookSync } from "../AnyHookSync";
import type { HookUID } from "../uid/HookUID";

export type HookRegistrySync = Map<HookUID, AnyHookSync>;
