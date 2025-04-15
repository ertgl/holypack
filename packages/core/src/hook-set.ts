import {
  createResolveConfigHook,
  createResolveContextHook,
  type ResolveConfigHook,
  type ResolveContextHook,
} from "./hooks";

export type HookSet = (
  & HookSetBaseProperties
  & HookSetCustomProperties
);

export type HookSetBaseProperties = {
  resolveConfig: ResolveConfigHook;
  resolveContext: ResolveContextHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HookSetCustomProperties
{}

export function createHookSet(): HookSet
{
  return {
    resolveConfig: createResolveConfigHook(),
    resolveContext: createResolveContextHook(),
  };
}
