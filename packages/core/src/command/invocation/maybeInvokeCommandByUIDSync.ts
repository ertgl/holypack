import type { ContextSync } from "../../context/ContextSync";
import type { CommandSync } from "../CommandSync";
import type { ExtractCommandData } from "../data/ExtractCommandData";
import type { ExtractCommandHandlerReturnType } from "../handler/ExtractCommandHandlerReturnType";
import { maybeUseCommandSync } from "../interop/maybeUseCommandSync";
import type { CommandUID } from "../uid/CommandUID";

import { invokeCommandSync } from "./invokeCommandSync";

export function maybeInvokeCommandByUIDSync<
  T_Command extends CommandSync = CommandSync,
  T_ReturnType extends ExtractCommandHandlerReturnType<T_Command> | undefined = ExtractCommandHandlerReturnType<T_Command> | undefined,
>(
  context: ContextSync,
  commandUID: CommandUID,
  data: NoInfer<ExtractCommandData<T_Command>>,
): T_ReturnType
{
  return maybeUseCommandSync<T_Command>(
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
