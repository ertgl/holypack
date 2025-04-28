import {
  createPostResolveProjectHook,
  createResolveProjectHook,
  HOOK_NAME_POST_RESOLVE_PROJECT,
  HOOK_NAME_RESOLVE_PROJECT,
  type PostResolveProjectHook,
  type ResolveProjectHook,
} from "../hooks";

export type ProjectHookSet = (
  & ProjectHookSetBaseProperties
  & ProjectHookSetCustomProperties
);

export type ProjectHookSetBaseProperties = {
  [HOOK_NAME_POST_RESOLVE_PROJECT]: PostResolveProjectHook;
  [HOOK_NAME_RESOLVE_PROJECT]: ResolveProjectHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectHookSetCustomProperties
{}

export function createProjectHookSet(): ProjectHookSet
{
  return {
    [HOOK_NAME_POST_RESOLVE_PROJECT]: createPostResolveProjectHook(),
    [HOOK_NAME_RESOLVE_PROJECT]: createResolveProjectHook(),
  };
}
