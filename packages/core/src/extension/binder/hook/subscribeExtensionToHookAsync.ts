import type { AnyHookAsync } from "../../../hook/AnyHookAsync";
import type { HookCallbackParameters } from "../../../hook/callback/HookCallbackParameters";
import type { HookCallbackReturnType } from "../../../hook/callback/HookCallbackReturnType";
import { maybeAwait } from "../../../lib/promise/maybeAwait";
import type { ExtensionMaybeAsync } from "../../ExtensionMaybeAsync";

import type { ExtensionMethodNameForHookCallbackAsync } from "./ExtensionMethodNameForHookCallbackAsync";

export function subscribeExtensionToHookAsync<
  T_Hook extends AnyHookAsync = AnyHookAsync,
  T_Extension extends ExtensionMaybeAsync = ExtensionMaybeAsync,
>(
  hook: T_Hook,
  extension: T_Extension,
  methodName: NoInfer<ExtensionMethodNameForHookCallbackAsync<T_Extension, T_Hook>>,
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

  hook.tapPromise(
    {
      name: tapName,
    },
    async (
      ...args: HookCallbackParameters<T_Hook>
    ): Promise<HookCallbackReturnType<T_Hook>> =>
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await maybeAwait(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-function-type
        (extension[methodName as keyof T_Extension] as Function)(
          ...args,
        ),
      );
    },
  );
}
