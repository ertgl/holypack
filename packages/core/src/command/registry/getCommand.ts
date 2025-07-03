import type { Context } from "../../context/Context";
import type { Command } from "../Command";
import type { CommandUID } from "../uid/CommandUID";

export function getCommand<
  T_Command extends Command,
>(
  context: Context,
  commandUID: CommandUID,
): T_Command | undefined
{
  return context.commands.get(commandUID) as T_Command | undefined;
}
