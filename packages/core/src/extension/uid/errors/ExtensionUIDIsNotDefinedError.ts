import { HolypackError } from "../../../error/HolypackError";
import type { Extension } from "../../Extension";

import { ERROR_EXTENSION_UID_IS_NOT_DEFINED } from "./ERROR_EXTENSION_UID_IS_NOT_DEFINED";

export class ExtensionUIDIsNotDefinedError extends HolypackError
{
  extension: Extension;

  constructor(
    extension: Extension,
  )
  {
    super(
      ERROR_EXTENSION_UID_IS_NOT_DEFINED,
      "Extension UID is not defined",
    );

    this.extension = extension;
  }
}
