import type { AnyHookAsync } from "./AnyHookAsync";
import type { AnyHookSync } from "./AnyHookSync";

export type AnyHook = (
  | AnyHookAsync
  | AnyHookSync
);
