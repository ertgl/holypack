import type { ContextAsync } from "../../context/ContextAsync";
import type { CommandAsync } from "../CommandAsync";
import type { ExtractCommandData } from "../data/ExtractCommandData";
import type { ExtractCommandHandlerReturnType } from "../handler/ExtractCommandHandlerReturnType";
import { useCommandAsync } from "../interop/useCommandAsync";
import type { CommandUID } from "../uid/CommandUID";

import { invokeCommandAsync } from "./invokeCommandAsync";

export async function invokeCommandByUIDAsync<
  T_Command extends CommandAsync = CommandAsync,
  T_ReturnType extends ExtractCommandHandlerReturnType<T_Command> = ExtractCommandHandlerReturnType<T_Command>,
>(
  context: ContextAsync,
  commandUID: CommandUID,
  data: NoInfer<ExtractCommandData<T_Command>>,
): Promise<T_ReturnType>
{
  return await useCommandAsync<T_Command>(
    context,
    commandUID,
    async (command) =>
    {
      return await invokeCommandAsync(
        context,
        command,
        data,
      );
    },
  ) as T_ReturnType;
}
