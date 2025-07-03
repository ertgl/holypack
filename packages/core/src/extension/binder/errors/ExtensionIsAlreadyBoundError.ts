import { HolypackError } from "../../../error/HolypackError";
import type { Extension } from "../../Extension";

import { ERROR_EXTENSION_IS_ALREADY_BOUND } from "./ERROR_EXTENSION_IS_ALREADY_BOUND";

export class ExtensionIsAlreadyBoundError extends HolypackError
{
  extension: Extension;

  constructor(
    extension: Extension,
  )
  {
    super(
      ERROR_EXTENSION_IS_ALREADY_BOUND,
      "Extension is already bound",
    );

    this.extension = extension;
  }
}
