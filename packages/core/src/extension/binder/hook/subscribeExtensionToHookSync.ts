import type { AnyHookSync } from "../../../hook/AnyHookSync";
import type { HookCallbackParameters } from "../../../hook/callback/HookCallbackParameters";
import type { HookCallbackReturnType } from "../../../hook/callback/HookCallbackReturnType";
import type { ExtensionSync } from "../../ExtensionSync";

import type { ExtensionMethodNameForHookCallbackSync } from "./ExtensionMethodNameForHookCallbackSync";

export function subscribeExtensionToHookSync<
  T_Hook extends AnyHookSync = AnyHookSync,
  T_Extension extends ExtensionSync = ExtensionSync,
>(
  hook: T_Hook,
  extension: T_Extension,
  methodName: NoInfer<ExtensionMethodNameForHookCallbackSync<T_Extension, T_Hook>>,
): void
{
  const tapName = `${extension.$uid}:${String(methodName)}`;

  const alreadySubscribed = hook.taps.some(
    (tap) => tap.name === tapName,
  );

  if (alreadySubscribed)
  {
    return;
  }

  hook.tap(
    {
      name: tapName,
    },
    (
      ...args: HookCallbackParameters<T_Hook>
    ): HookCallbackReturnType<T_Hook> =>
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-function-type
      return (extension[methodName as keyof T_Extension] as Function)(...args);
    },
  );
}
