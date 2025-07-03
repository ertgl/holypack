import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import { getExtension } from "../registry/getExtension";
import type { ExtensionUID } from "../uid/ExtensionUID";

import type { UseExtensionCallbackMaybeAsync } from "./UseExtensionCallbackMaybeAsync";

export async function maybeUseExtensionAsync<
  T_Callback extends UseExtensionCallbackMaybeAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>> | undefined,
>(
  context: ContextAsync,
  extensionUID: ExtensionUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const extension = getExtension(
    context,
    extensionUID,
  );

  if (extension != null)
  {
    return await maybeAwait(callback(extension)) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
