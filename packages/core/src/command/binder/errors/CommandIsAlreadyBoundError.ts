import { HolypackError } from "../../../error/HolypackError";
import type { Command } from "../../Command";

import { ERROR_COMMAND_IS_ALREADY_BOUND } from "./ERROR_COMMAND_IS_ALREADY_BOUND";

export class CommandIsAlreadyBoundError extends HolypackError
{
  command: Command;

  constructor(
    command: Command,
  )
  {
    super(
      ERROR_COMMAND_IS_ALREADY_BOUND,
      "Command is already bound",
    );

    this.command = command;
  }
}
