import type { AnyHook } from "../AnyHook";
import type { HookUID } from "../uid/HookUID";

export type HookRegistryAsync = Map<HookUID, AnyHook>;
