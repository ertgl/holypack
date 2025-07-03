import type { SystemHookUIDAsync } from "./SystemHookUIDAsync";
import type { SystemHookUIDSync } from "./SystemHookUIDSync";

export type SystemHookUID = (
  | SystemHookUIDAsync
  | SystemHookUIDSync
);
