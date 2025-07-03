import type { Context } from "../../context/Context";
import type { Command } from "../Command";
import type { CommandUID } from "../uid/CommandUID";

import { CommandIsNotFoundError } from "./errors/CommandIsNotFoundError";
import { getCommand } from "./getCommand";

export function requireCommand<
  T_Command extends Command,
>(
  context: Context,
  commandUID: CommandUID,
): T_Command
{
  const command = getCommand<T_Command>(
    context,
    commandUID,
  );

  if (command == null)
  {
    throw new CommandIsNotFoundError(commandUID);
  }

  return command;
}
