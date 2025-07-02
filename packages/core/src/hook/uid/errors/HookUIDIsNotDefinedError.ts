import { HolypackError } from "../../../error/HolypackError";
import type { AnyHook } from "../../AnyHook";

import { ERROR_HOOK_UID_IS_NOT_DEFINED } from "./ERROR_HOOK_UID_IS_NOT_DEFINED";

export class HookUIDIsNotDefinedError extends HolypackError
{
  hook: AnyHook;

  constructor(
    hook: AnyHook,
  )
  {
    super(
      ERROR_HOOK_UID_IS_NOT_DEFINED,
      "Hook UID is not defined",
    );

    this.hook = hook;
  }
}
