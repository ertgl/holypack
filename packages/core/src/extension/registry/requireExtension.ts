import type { Context } from "../../context/Context";
import type { Extension } from "../Extension";
import type { ExtensionUID } from "../uid/ExtensionUID";

import { ExtensionIsNotFoundError } from "./errors/ExtensionIsNotFoundError";
import { getExtension } from "./getExtension";

export function requireExtension<
  T_Extension extends Extension,
>(
  context: Context,
  extensionUID: ExtensionUID,
): T_Extension
{
  const extension = getExtension<T_Extension>(
    context,
    extensionUID,
  );

  if (extension == null)
  {
    throw new ExtensionIsNotFoundError(extensionUID);
  }

  return extension;
}
