import { HolypackError } from "../../../error/HolypackError";
import type { HookUID } from "../../uid/HookUID";

import { ERROR_HOOK_IS_NOT_FOUND } from "./ERROR_HOOK_IS_NOT_FOUND";

export class HookIsNotFoundError extends HolypackError
{
  hookUID: HookUID;

  constructor(
    hookUID: HookUID,
  )
  {
    super(
      ERROR_HOOK_IS_NOT_FOUND,
      "Hook is not found",
    );

    this.hookUID = hookUID;
  }
}
