import type { Optional } from "../../lib/object/Optional";
import type { Extension } from "../Extension";

import { ExtensionUIDIsNotDefinedError } from "./errors/ExtensionUIDIsNotDefinedError";

export function validateExtensionUID(
  extensionUID: Optional<string>,
  extension: Extension,
): asserts extensionUID is string
{
  if ((extension.$uid as Optional<string>) == null || extension.$uid.length === 0)
  {
    throw new ExtensionUIDIsNotDefinedError(extension);
  }
}
