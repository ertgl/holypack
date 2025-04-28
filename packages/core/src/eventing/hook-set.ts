import {
  createResolveConfigHook,
  HOOK_NAME_RESOLVE_CONFIG,
  type ResolveConfigHook,
} from "../config/hooks";
import {
  createPostResolveContextHook,
  createResolveContextHook,
  createSetupHook,
  HOOK_NAME_POST_RESOLVE_CONTEXT,
  HOOK_NAME_RESOLVE_CONTEXT,
  HOOK_NAME_SETUP,
  type PostResolveContextHook,
  ResolveContextHook,
  type SetupHook,
} from "../context/hooks";

export type HookSet = (
  & HookSetBaseProperties
  & HookSetCustomProperties
);

export type HookSetBaseProperties = {
  [HOOK_NAME_POST_RESOLVE_CONTEXT]: PostResolveContextHook;
  [HOOK_NAME_RESOLVE_CONFIG]: ResolveConfigHook;
  [HOOK_NAME_RESOLVE_CONTEXT]: ResolveContextHook;
  [HOOK_NAME_SETUP]: SetupHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HookSetCustomProperties
{}

export type TypeSafeHookSet = (
  & HookSetBaseProperties
  & Partial<HookSetCustomProperties>
);

export function createHookSet(): TypeSafeHookSet
{
  return {
    [HOOK_NAME_POST_RESOLVE_CONTEXT]: createPostResolveContextHook(),
    [HOOK_NAME_RESOLVE_CONFIG]: createResolveConfigHook(),
    [HOOK_NAME_RESOLVE_CONTEXT]: createResolveContextHook(),
    [HOOK_NAME_SETUP]: createSetupHook(),
  };
}
