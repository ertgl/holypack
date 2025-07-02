import { HolypackError } from "../../../error/HolypackError";
import type { ExtensionUID } from "../../uid/ExtensionUID";

import { ERROR_EXTENSION_IS_NOT_FOUND } from "./ERROR_EXTENSION_IS_NOT_FOUND";

export class ExtensionIsNotFoundError extends HolypackError
{
  extensionUID: ExtensionUID;

  constructor(
    extensionUID: ExtensionUID,
  )
  {
    super(
      ERROR_EXTENSION_IS_NOT_FOUND,
      "Extension is not found",
    );

    this.extensionUID = extensionUID;
  }
}
