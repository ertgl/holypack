import type {
  EmitWarningHook,
  HOOK_NAME_EMIT_WARNING,
} from "../hooks";

declare module "../../../../../eventing/hook-set"
{
  interface HookSetCustomProperties
  {
    [HOOK_NAME_EMIT_WARNING]: EmitWarningHook;
  }
}

export {};
