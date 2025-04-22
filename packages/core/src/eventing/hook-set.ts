import {
  createEmitWarningHook,
  createPostResolveContextHook,
  createResolveConfigHook,
  createResolveContextHook,
  createSetupHook,
  type EmitWarningHook,
  type PostResolveContextHook,
  type ResolveConfigHook,
  type ResolveContextHook,
  type SetupHook,
} from "../hooks";

export type HookSet = (
  & HookSetBaseProperties
  & HookSetCustomProperties
);

export type HookSetBaseProperties = {
  emitWarning: EmitWarningHook;
  postResolveContext: PostResolveContextHook;
  resolveConfig: ResolveConfigHook;
  resolveContext: ResolveContextHook;
  setup: SetupHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HookSetCustomProperties
{}

export function createHookSet(): HookSet
{
  return {
    emitWarning: createEmitWarningHook(),
    postResolveContext: createPostResolveContextHook(),
    resolveConfig: createResolveConfigHook(),
    resolveContext: createResolveContextHook(),
    setup: createSetupHook(),
  };
}
