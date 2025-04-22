import { AsyncParallelHook } from "tapable";

import type {
  Context,
  ResolvedContext,
} from "../context";

export const HOOK_NAME_EMIT_WARNING = "emitWarning";

export type EmitWarningHook = AsyncParallelHook<EmitWarningHookParameters, void>;

export type EmitWarningHookParameters = [
  Context | ResolvedContext,
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
