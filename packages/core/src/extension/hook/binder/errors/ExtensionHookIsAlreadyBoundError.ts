import type { AnyHook } from "../../../../hook/AnyHook";
import { HookIsAlreadyBoundError } from "../../../../hook/binder/errors/HookIsAlreadyBoundError";
import type { Extension } from "../../../Extension";

import { ERROR_EXTENSION_HOOK_IS_ALREADY_BOUND } from "./ERROR_EXTENSION_HOOK_IS_ALREADY_BOUND";

export class ExtensionHookIsAlreadyBoundError extends HookIsAlreadyBoundError
{
  extension: Extension;

  constructor(
    extension: Extension,
    hook: AnyHook,
  )
  {
    super(hook);

    this.name = ERROR_EXTENSION_HOOK_IS_ALREADY_BOUND;
    this.message = "Extension hook is already bound";

    this.extension = extension;
  }
}
