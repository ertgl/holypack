import type { ContextAsync } from "../../context/ContextAsync";
import type { Context } from "../Context";
import type { ContextSync } from "../ContextSync";

import { sealContextAsync } from "./sealContextAsync";
import type { SealContextCallbackAsync } from "./SealContextCallbackAsync";
import type { SealContextCallbackSync } from "./SealContextCallbackSync";
import { sealContextSync } from "./sealContextSync";

export async function sealContext(
  context: Context,
  callback?: null,
): Promise<undefined>;
export async function sealContext<
  T_Callback extends SealContextCallbackAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  callback: T_Callback,
): Promise<T_ReturnType>;
export async function sealContext<
  T_Callback extends SealContextCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback>,
>(
  context: ContextSync,
  callback: T_Callback,
): Promise<T_ReturnType>;
export async function sealContext<
  T_Callback extends SealContextCallbackAsync<any>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  callback?: null | T_Callback,
): Promise<T_ReturnType | undefined>;
export async function sealContext<
  T_Callback extends SealContextCallbackSync<any>,
  T_ReturnType extends ReturnType<T_Callback>,
>(
  context: ContextSync,
  callback?: null | T_Callback,
): Promise<T_ReturnType | undefined>;
export async function sealContext<
  T_Callback extends SealContextCallbackAsync<any> | SealContextCallbackSync<any>,
  T_ReturnType extends (
    T_Callback extends SealContextCallbackAsync<any>
      ? Awaited<ReturnType<T_Callback>>
      : ReturnType<T_Callback>
  ),
>(
  context: ContextAsync | ContextSync,
  callback?: null | T_Callback,
): Promise<T_ReturnType | undefined>;
export async function sealContext<
  T_Callback extends SealContextCallbackAsync<any> | SealContextCallbackSync<any>,
  T_ReturnType extends (
    T_Callback extends SealContextCallbackAsync<any>
      ? Awaited<ReturnType<T_Callback>>
      : ReturnType<T_Callback>
  ),
>(
  context: ContextAsync | ContextSync,
  callback?: null | T_Callback,
): Promise<T_ReturnType | undefined>
{
  if (context.sync)
  {
    return sealContextSync(
      context,
      callback,
    ) as T_ReturnType;
  }

  return await sealContextAsync(
    context,
    callback,
  ) as T_ReturnType;
}
