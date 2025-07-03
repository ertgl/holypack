import type { ContextAsync } from "../../context/ContextAsync";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { CommandAsync } from "../CommandAsync";
import type { ExtractCommandData } from "../data/ExtractCommandData";
import type { ExtractCommandHandlerReturnType } from "../handler/ExtractCommandHandlerReturnType";
import type { CommandPayloadAsync } from "../payload/CommandPayloadAsync";

export async function invokeCommandAsync<
  T_Command extends CommandAsync = CommandAsync,
  T_ReturnType extends ExtractCommandHandlerReturnType<T_Command> = ExtractCommandHandlerReturnType<T_Command>,
>(
  context: ContextAsync,
  command: T_Command,
  data: NoInfer<ExtractCommandData<T_Command>>,
): Promise<T_ReturnType>
{
  const payload: CommandPayloadAsync = {
    context,
    data,
  };

  return (await maybeAwait(command.handler(payload))) as T_ReturnType;
}
