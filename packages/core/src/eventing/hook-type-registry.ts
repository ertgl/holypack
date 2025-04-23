import type { EmitWarningHook, PostResolveContextHook, ResolveConfigHook, ResolveContextHook, SetupHook } from "../hooks";

export type HookTypeRegistry = (
  & HookTypeRegistryBaseProperties
  & HookTypeRegistryCustomProperties
);

export type HookTypeRegistryBaseProperties = {
  EmitWarning: EmitWarningHook;
  PostResolveContext: PostResolveContextHook;
  ResolveConfig: ResolveConfigHook;
  ResolveContext: ResolveContextHook;
  Setup: SetupHook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HookTypeRegistryCustomProperties
{}
