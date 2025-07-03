import { HookIsNotFoundError } from "../../../../hook/registry/errors/HookIsNotFoundError";
import type { HookUID } from "../../../../hook/uid/HookUID";
import type { Extension } from "../../../Extension";

import { ERROR_EXTENSION_HOOK_IS_NOT_FOUND } from "./ERROR_EXTENSION_HOOK_IS_NOT_FOUND";

export class ExtensionHookIsNotFoundError extends HookIsNotFoundError
{
  extension: Extension;

  constructor(
    extension: Extension,
    hookUID: HookUID,
  )
  {
    super(hookUID);

    this.name = ERROR_EXTENSION_HOOK_IS_NOT_FOUND;
    this.message = "Extension hook is not found";

    this.extension = extension;
  }
}
