export const ERROR_HOOK_NOT_FOUND = "HookNotFoundError";

export class HookNotFoundError extends Error
{
  hookName: string;

  constructor(
    hookName: string,
  )
  {
    super(`Hook not found: ${hookName}`);
    this.name = ERROR_HOOK_NOT_FOUND;
    this.hookName = hookName;
  }
}
