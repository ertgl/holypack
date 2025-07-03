import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import { requireExtension } from "../registry/requireExtension";
import type { ExtensionUID } from "../uid/ExtensionUID";

import type { UseExtensionCallbackMaybeAsync } from "./UseExtensionCallbackMaybeAsync";

export async function useExtensionAsync<
  T_Callback extends UseExtensionCallbackMaybeAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  extensionUID: ExtensionUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const extension = requireExtension(
    context,
    extensionUID,
  );

  return await maybeAwait(callback(extension)) as T_ReturnType;
}
