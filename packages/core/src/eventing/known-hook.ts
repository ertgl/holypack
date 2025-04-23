import type { HookTypeRegistry } from "./hook-type-registry";

export type KnownHook = HookTypeRegistry[keyof HookTypeRegistry];
