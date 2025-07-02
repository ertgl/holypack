import type {
  SyncBailHook,
  SyncHook,
  SyncLoopHook,
  SyncWaterfallHook,
} from "tapable";

export type HookSync<
  T_Parameters = unknown,
  T_ReturnType = unknown,
> = (
  | SyncBailHook<T_Parameters, T_ReturnType>
  | SyncHook<T_Parameters, T_ReturnType>
  | SyncLoopHook<T_Parameters>
  | SyncWaterfallHook<T_Parameters>
);
