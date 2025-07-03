import type { ContextSync } from "../../context/ContextSync";
import type { CommandSync } from "../CommandSync";
import type { ExtractCommandData } from "../data/ExtractCommandData";
import type { ExtractCommandHandlerReturnType } from "../handler/ExtractCommandHandlerReturnType";
import type { CommandPayloadSync } from "../payload/CommandPayloadSync";

export function invokeCommandSync<
  T_Command extends CommandSync = CommandSync,
  T_ReturnType extends ExtractCommandHandlerReturnType<T_Command> = ExtractCommandHandlerReturnType<T_Command>,
>(
  context: ContextSync,
  command: T_Command,
  data: NoInfer<ExtractCommandData<T_Command>>,
): T_ReturnType
{
  const payload: CommandPayloadSync = {
    context,
    data,
  };

  return command.handler(payload) as T_ReturnType;
}
