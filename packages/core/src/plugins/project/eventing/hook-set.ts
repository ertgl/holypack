import {
  createPostProjectResolutionHook,
  createProjectResolutionHook,
  type PostProjectResolutionHook,
  type ProjectResolutionHook,
} from "../hooks";

export type ProjectHookSet = (
  & ProjectHookSetBaseProperties
  & ProjectHookSetCustomProperties
);

export type ProjectHookSetBaseProperties = {
  postProjectResolution: PostProjectResolutionHook;
  projectResolution: ProjectResolutionHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectHookSetCustomProperties
{}

export function createProjectHookSet(): ProjectHookSet
{
  return {
    postProjectResolution: createPostProjectResolutionHook(),
    projectResolution: createProjectResolutionHook(),
  };
}
