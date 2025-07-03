import type { Context } from "../../context/Context";
import type { CommandSync } from "../CommandSync";
import type { CommandUID } from "../uid/CommandUID";

import { requireCommand } from "./requireCommand";

export function requireCommandSync<
  T_Command extends CommandSync,
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
