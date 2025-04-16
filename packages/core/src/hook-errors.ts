import type { Hook } from "./hook";

export const ERROR_HOOK_NAME_IS_NOT_DEFINED = "HookNameIsNotDefinedError";

export class HookNameIsNotDefinedError extends Error
{
  hook: Hook;

  constructor(
    hook: Hook,
  )
  {
    super("Hook name is not defined");
    this.name = ERROR_HOOK_NAME_IS_NOT_DEFINED;
    this.hook = hook;
  }
}
