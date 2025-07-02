import { HolypackError } from "../../../error/HolypackError";
import type { AnyHook } from "../../AnyHook";

import { ERROR_HOOK_IS_ALREADY_BOUND } from "./ERROR_HOOK_IS_ALREADY_BOUND";

export class HookIsAlreadyBoundError extends HolypackError
{
  hook: AnyHook;

  constructor(
    hook: AnyHook,
  )
  {
    super(
      ERROR_HOOK_IS_ALREADY_BOUND,
      "Hook is already bound",
    );

    this.hook = hook;
  }
}
