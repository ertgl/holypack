import { AsyncParallelHook } from "tapable";

import type { TypeSafeContext } from "../../../../../context";
import { PLUGIN_NAME_PROCESS_WARNING_MONITOR } from "../plugin-name";

export const HOOK_NAME_EMIT_WARNING = `${PLUGIN_NAME_PROCESS_WARNING_MONITOR}#emitWarning`;

export type EmitWarningHook = AsyncParallelHook<EmitWarningHookParameters, void>;

export type EmitWarningHookParameters = [
  TypeSafeContext,
  Error,
];

export function createEmitWarningHook(): EmitWarningHook
{
  return new AsyncParallelHook(
    [
      "context",
      "err",
    ] as const,
    HOOK_NAME_EMIT_WARNING,
  );
}
