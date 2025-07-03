import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { CommandAsync } from "../CommandAsync";
import { requireCommand } from "../registry/requireCommand";
import type { CommandUID } from "../uid/CommandUID";

import type { UseCommandCallbackMaybeAsync } from "./UseCommandCallbackMaybeAsync";

export async function useCommandAsync<
  T_Command extends CommandAsync = CommandAsync,
  T_Callback extends UseCommandCallbackMaybeAsync<T_Command> = UseCommandCallbackMaybeAsync<T_Command>,
  T_ReturnType extends Awaited<ReturnType<T_Callback>> = Awaited<ReturnType<T_Callback>>,
>(
  context: ContextAsync,
  commandUID: CommandUID,
  callback: T_Callback,
): Promise<T_ReturnType>
{
  const command = requireCommand<T_Command>(
    context,
    commandUID,
  );

  return await maybeAwait(callback(command)) as T_ReturnType;
}
