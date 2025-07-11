import { SyncHook } from "tapable";

import { CLI_HOOK_UID_SETUP_CLI_SYNC } from "./CLI_HOOK_UID_SETUP_CLI_SYNC";
import type { SetupCLIHookSync } from "./SetupCLIHookSync";

export function createSetupCLIHookSync(): SetupCLIHookSync
{
  return new SyncHook(
    [
      "context",
      "program",
    ] as const,
    CLI_HOOK_UID_SETUP_CLI_SYNC,
  );
}
