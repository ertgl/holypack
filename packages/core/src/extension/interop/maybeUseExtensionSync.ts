import type { ContextSync } from "../../context/ContextSync";
import { getExtension } from "../registry/getExtension";
import type { ExtensionUID } from "../uid/ExtensionUID";

import type { UseExtensionCallbackSync } from "./UseExtensionCallbackSync";

export function maybeUseExtensionSync<
  T_Callback extends UseExtensionCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback> | undefined,
>(
  context: ContextSync,
  extensionUID: ExtensionUID,
  callback: T_Callback,
): T_ReturnType
{
  const extension = getExtension(
    context,
    extensionUID,
  );

  if (extension != null)
  {
    return callback(extension) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
