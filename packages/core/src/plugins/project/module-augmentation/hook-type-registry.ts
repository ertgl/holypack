import type {
  PostProjectResolutionHook,
  ProjectResolutionHook,
} from "../hooks";

declare module "../../../eventing/hook-type-registry"
{

  interface HookTypeRegistryCustomProperties
  {
    PostProjectResolution: PostProjectResolutionHook;
    ProjectResolution: ProjectResolutionHook;
  }
}

export {};
