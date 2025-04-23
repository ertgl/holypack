import type { KnownHook } from "../known-hook";

export const ERROR_HOOK_NAME_IS_NOT_DEFINED = "HookNameIsNotDefinedError";

export class HookNameIsNotDefinedError extends Error
{
  hook: KnownHook;

  constructor(
    hook: KnownHook,
  )
  {
    super("Hook name is not defined");
    this.name = ERROR_HOOK_NAME_IS_NOT_DEFINED;
    this.hook = hook;
  }
}
