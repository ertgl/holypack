import { HolypackError } from "../../../error/HolypackError";
import type { CommandUID } from "../../uid/CommandUID";

import { ERROR_COMMAND_IS_NOT_FOUND } from "./ERROR_COMMAND_IS_NOT_FOUND";

export class CommandIsNotFoundError extends HolypackError
{
  commandUID: CommandUID;

  constructor(
    commandUID: CommandUID,
  )
  {
    super(
      ERROR_COMMAND_IS_NOT_FOUND,
      "Command is not found",
    );

    this.commandUID = commandUID;
  }
}
