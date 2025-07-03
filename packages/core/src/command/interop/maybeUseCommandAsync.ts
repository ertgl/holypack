import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { CommandAsync } from "../CommandAsync";
import { getCommand } from "../registry/getCommand";
import type { CommandUID } from "../uid/CommandUID";

import type { UseCommandCallbackMaybeAsync } from "./UseCommandCallbackMaybeAsync";

export async function maybeUseCommandAsync<
  T_Command extends CommandAsync = CommandAsync,
  T_Callback extends UseCommandCallbackMaybeAsync<T_Command> = UseCommandCallbackMaybeAsync<T_Command>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextAsync,
  commandUID: CommandUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const command = getCommand<T_Command>(
    context,
    commandUID,
  );

  if (command != null)
  {
    return await maybeAwait(callback(command)) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
