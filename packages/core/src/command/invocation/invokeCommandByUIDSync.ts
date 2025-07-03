import type { ContextSync } from "../../context/ContextSync";
import type { CommandSync } from "../CommandSync";
import type { ExtractCommandData } from "../data/ExtractCommandData";
import type { ExtractCommandHandlerReturnType } from "../handler/ExtractCommandHandlerReturnType";
import { useCommandSync } from "../interop/useCommandSync";
import type { CommandUID } from "../uid/CommandUID";

import { invokeCommandSync } from "./invokeCommandSync";

export function invokeCommandByUIDSync<
  T_Command extends CommandSync = CommandSync,
  T_ReturnType extends ExtractCommandHandlerReturnType<T_Command> = ExtractCommandHandlerReturnType<T_Command>,
>(
  context: ContextSync,
  commandUID: CommandUID,
  data: NoInfer<ExtractCommandData<T_Command>>,
): T_ReturnType
{
  return useCommandSync<T_Command>(
    context,
    commandUID,
    (command) =>
    {
      return invokeCommandSync(
        context,
        command,
        data,
      );
    },
  ) as T_ReturnType;
}
