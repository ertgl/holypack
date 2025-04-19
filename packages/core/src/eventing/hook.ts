import type { HookSet } from "./hook-set";

// TODO(ertgl): Rename type Hook as KnownHook.
export type Hook = HookSet[keyof HookSet];
