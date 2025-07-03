import { HolypackError } from "../../../../error/HolypackError";
import type { Command } from "../../../Command";

import { ERROR_COMMAND_UID_IS_NOT_DEFINED } from "./ERROR_COMMAND_UID_IS_NOT_DEFINED";

export class CommandUIDIsNotDefinedError extends HolypackError
{
  command: Command;

  constructor(
    command: Command,
  )
  {
    super(
      ERROR_COMMAND_UID_IS_NOT_DEFINED,
      "Command UID is not defined",
    );

    this.command = command;
  }
}
