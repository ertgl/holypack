import type { ContextAsync } from "../../context/ContextAsync";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC } from "../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC } from "../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC";
import { withMutexAsync } from "../../lib/mutex/withMutexAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import { useSystemHookAsync } from "../../system/hook/interop/useSystemHookAsync";

import { ContextIsAlreadySealedError } from "./errors/ContextIsAlreadySealedError";
import type { SealContextCallbackMaybeAsync } from "./SealContextCallbackMaybeAsync";

export async function sealContextAsync(
  context: ContextAsync,
  callback?: null,
): Promise<undefined>;
export async function sealContextAsync<
  T_Callback extends SealContextCallbackMaybeAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  callback: T_Callback,
): Promise<T_ReturnType>;
export async function sealContextAsync<
  T_Callback extends SealContextCallbackMaybeAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  callback?: null | T_Callback,
): Promise<T_ReturnType | undefined>;
export async function sealContextAsync<
  T_Callback extends SealContextCallbackMaybeAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  callback?: null | T_Callback,
): Promise<T_ReturnType | undefined>
{
  return await withMutexAsync(
    context.sealerMutex,
    async () =>
    {
      if (context.sealed)
      {
        throw new ContextIsAlreadySealedError(context);
      }

      const result = (
        callback != null
          ? await maybeAwait(callback(context)) as T_ReturnType
          : undefined
      );

      await useSystemHookAsync(
        context,
        SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC,
        async (sealContextHook) =>
        {
          await sealContextHook.promise(context);
        },
      );

      context.sealed = true;

      await useSystemHookAsync(
        context,
        SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC,
        async (postSealContextHook) =>
        {
          await postSealContextHook.promise(context);
        },
      );

      return result;
    },
  );
}
