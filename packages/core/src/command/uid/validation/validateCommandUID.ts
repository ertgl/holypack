import type { Optional } from "../../../lib/object/Optional";
import type { Command } from "../../Command";

import { CommandUIDIsNotDefinedError } from "./errors/CommandUIDIsNotDefinedError";

export function validateCommandUID(
  commandUID: Optional<string>,
  command: Command,
): asserts commandUID is string
{
  if ((command.uid as string | undefined) == null || command.uid.length === 0)
  {
    throw new CommandUIDIsNotDefinedError(command);
  }
}
