import type { HookSet } from "./hook-set";

// TODO(ertgl): Maybe rename type `Hook` as `KnownHook`.
export type Hook = HookSet[keyof HookSet];
