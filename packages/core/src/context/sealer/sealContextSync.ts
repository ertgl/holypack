import type { ContextSync } from "../../context/ContextSync";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC } from "../../hooks/post-seal-context/SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC } from "../../hooks/seal-context/SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC";
import { withMutexSync } from "../../lib/mutex/withMutexSync";
import { useSystemHookSync } from "../../system/hook/interop/useSystemHookSync";

import { ContextIsAlreadySealedError } from "./errors/ContextIsAlreadySealedError";
import type { SealContextCallbackSync } from "./SealContextCallbackSync";

export function sealContextSync(
  context: ContextSync,
  callback?: null,
): undefined;
export function sealContextSync<
  T_Callback extends SealContextCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback>,
>(
  context: ContextSync,
  callback: T_Callback,
): T_ReturnType;
export function sealContextSync<
  T_Callback extends SealContextCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback>,
>(
  context: ContextSync,
  callback?: null | T_Callback,
): T_ReturnType | undefined;
export function sealContextSync<
  T_Callback extends SealContextCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback>,
>(
  context: ContextSync,
  callback?: null | T_Callback,
): T_ReturnType | undefined
{
  return withMutexSync(
    context.sealerMutex,
    () =>
    {
      if (context.sealed)
      {
        throw new ContextIsAlreadySealedError(context);
      }

      const result = (
        callback != null
          ? callback(context) as T_ReturnType
          : undefined
      );

      useSystemHookSync(
        context,
        SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC,
        (sealContextHook) =>
        {
          sealContextHook.call(context);
        },
      );

      context.sealed = true;

      useSystemHookSync(
        context,
        SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC,
        (postSealContextHook) =>
        {
          postSealContextHook.call(context);
        },
      );

      return result;
    },
  );
}
