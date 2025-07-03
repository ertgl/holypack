import type { SystemHooksAsync } from "./SystemHooksAsync";
import type { SystemHooksSync } from "./SystemHooksSync";

export type SystemHooks = (
  & SystemHooksAsync
  & SystemHooksSync
);
