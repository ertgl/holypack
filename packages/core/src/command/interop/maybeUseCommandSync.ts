import type { ContextSync } from "../../context/ContextSync";
import type { CommandSync } from "../CommandSync";
import { getCommand } from "../registry/getCommand";
import type { CommandUID } from "../uid/CommandUID";

import type { UseCommandCallbackSync } from "./UseCommandCallbackSync";

export function maybeUseCommandSync<
  T_Command extends CommandSync = CommandSync,
  T_Callback extends UseCommandCallbackSync<T_Command> = UseCommandCallbackSync<T_Command>,
  T_ReturnType extends ReturnType<T_Callback> | undefined = ReturnType<T_Callback> | undefined,
>(
  context: ContextSync,
  commandUID: CommandUID,
  callback: T_Callback,
): T_ReturnType
{
  const command = getCommand<T_Command>(
    context,
    commandUID,
  );

  if (command != null)
  {
    return callback(command) as T_ReturnType;
  }

  return undefined as T_ReturnType;
}
