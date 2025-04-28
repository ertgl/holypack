import type { ProjectHookSet } from "../eventing";

declare module "../../../eventing/hook-type-registry"
{

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface HookTypeRegistryCustomProperties extends ProjectHookSet
  {}
}

export {};
