import type { HookSet } from "./hook-set";

export type HookTypeRegistry = (
  & HookTypeRegistryBaseProperties
  & HookTypeRegistryCustomProperties
);

export type HookTypeRegistryBaseProperties = (
  & HookSet
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HookTypeRegistryCustomProperties
{}
