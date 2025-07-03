import type { Context } from "../../context/Context";
import type { CommandAsync } from "../CommandAsync";
import type { CommandUID } from "../uid/CommandUID";

import { requireCommand } from "./requireCommand";

export function requireCommandAsync<
  T_Command extends CommandAsync,
>(
  context: Context,
  commandUID: CommandUID,
): T_Command
{
  return requireCommand<T_Command>(
    context,
    commandUID,
  );
}
