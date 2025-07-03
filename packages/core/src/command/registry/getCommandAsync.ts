import type { Context } from "../../context/Context";
import type { CommandAsync } from "../CommandAsync";
import type { CommandUID } from "../uid/CommandUID";

import { getCommand } from "./getCommand";

export function getCommandAsync<
  T_Command extends CommandAsync,
>(
  context: Context,
  commandUID: CommandUID,
): T_Command | undefined
{
  return getCommand<T_Command>(
    context,
    commandUID,
  );
}
