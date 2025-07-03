import type { ContextSync } from "../../context/ContextSync";
import type { CommandSync } from "../CommandSync";
import { requireCommand } from "../registry/requireCommand";
import type { CommandUID } from "../uid/CommandUID";

import type { UseCommandCallbackSync } from "./UseCommandCallbackSync";

export function useCommandSync<
  T_Command extends CommandSync = CommandSync,
  T_Callback extends UseCommandCallbackSync<T_Command> = UseCommandCallbackSync<T_Command>,
  T_ReturnType extends ReturnType<T_Callback> = ReturnType<T_Callback>,
>(
  context: ContextSync,
  commandUID: CommandUID,
  callback: T_Callback,
): T_ReturnType
{
  const command = requireCommand<T_Command>(
    context,
    commandUID,
  );

  return callback(command) as T_ReturnType;
}
