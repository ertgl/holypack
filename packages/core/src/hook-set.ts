import {
  createPostResolveContextHook,
  createResolveConfigHook,
  createResolveContextHook,
  type PostResolveContextHook,
  type ResolveConfigHook,
  type ResolveContextHook,
} from "./hooks";

export type HookSet = (
  & HookSetBaseProperties
  & HookSetCustomProperties
);

export type HookSetBaseProperties = {
  postResolveContext: PostResolveContextHook;
  resolveConfig: ResolveConfigHook;
  resolveContext: ResolveContextHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HookSetCustomProperties
{}

export function createHookSet(): HookSet
{
  return {
    postResolveContext: createPostResolveContextHook(),
    resolveConfig: createResolveConfigHook(),
    resolveContext: createResolveContextHook(),
  };
}
