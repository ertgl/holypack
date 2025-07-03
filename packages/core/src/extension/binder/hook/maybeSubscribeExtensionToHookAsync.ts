import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import type { ExtensionMaybeAsync } from "../../ExtensionMaybeAsync";

import type { ExtensionMethodNameForHookCallbackAsync } from "./ExtensionMethodNameForHookCallbackAsync";
import { subscribeExtensionToHookAsync } from "./subscribeExtensionToHookAsync";

export function maybeSubscribeExtensionToHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Extension extends ExtensionMaybeAsync = ExtensionMaybeAsync,
>(
  hook: T_Hook,
  extension: T_Extension,
  methodName: ExtensionMethodNameForHookCallbackAsync<T_Extension, T_Hook>,
): void
{
  if (extension[methodName as keyof T_Extension] != null)
  {
    subscribeExtensionToHookAsync(
      hook,
      extension,
      methodName,
    );
  }
}
