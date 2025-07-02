import { HolypackError } from "../../../../error/HolypackError";
import type { Extension } from "../../../Extension";

import { ERROR_EXTENSION_HAS_NO_HOOK_REGISTRY } from "./ERROR_EXTENSION_HAS_NO_HOOK_REGISTRY";

export class ExtensionHasNoHookRegistryError extends HolypackError
{
  extension: Extension;

  constructor(
    extension: Extension,
  )
  {
    super(
      ERROR_EXTENSION_HAS_NO_HOOK_REGISTRY,
      "Extension has no hook registry",
    );

    this.extension = extension;
  }
}
