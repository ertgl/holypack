import type { HookAsync } from "./HookAsync";
import type { HookSync } from "./HookSync";

export type Hook<
  T_Parameters = unknown,
  T_ReturnType = unknown,
> = (
  | HookAsync<T_Parameters, T_ReturnType>
  | HookSync<T_Parameters, T_ReturnType>
);
