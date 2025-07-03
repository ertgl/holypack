import type { Context } from "../../context/Context";
import type { CommandSync } from "../CommandSync";
import type { CommandUID } from "../uid/CommandUID";

import { getCommand } from "./getCommand";

export function getCommandSync<
  T_Command extends CommandSync,
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
