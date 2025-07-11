import { AsyncParallelHook } from "tapable";

import { CLI_HOOK_UID_SETUP_CLI_ASYNC } from "./CLI_HOOK_UID_SETUP_CLI_ASYNC";
import type { SetupCLIHookAsync } from "./SetupCLIHookAsync";

export function createSetupCLIHookAsync(): SetupCLIHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "program",
    ] as const,
    CLI_HOOK_UID_SETUP_CLI_ASYNC,
  );
}
