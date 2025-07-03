import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { ExtensionSync } from "../../ExtensionSync";

import type { ExtensionMethodNameForHookCallbackSync } from "./ExtensionMethodNameForHookCallbackSync";
import { subscribeExtensionToHookSync } from "./subscribeExtensionToHookSync";

export function maybeSubscribeExtensionToHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Extension extends ExtensionSync = ExtensionSync,
>(
  hook: T_Hook,
  extension: T_Extension,
  methodName: ExtensionMethodNameForHookCallbackSync<T_Extension, T_Hook>,
): void
{
  if (extension[methodName as keyof T_Extension] != null)
  {
    subscribeExtensionToHookSync(
      hook,
      extension,
      methodName,
    );
  }
}
