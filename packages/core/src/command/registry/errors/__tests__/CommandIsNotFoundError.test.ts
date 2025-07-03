import { CommandIsNotFoundError } from "../CommandIsNotFoundError";
import { ERROR_COMMAND_IS_NOT_FOUND } from "../ERROR_COMMAND_IS_NOT_FOUND";

describe(
  "CommandIsNotFoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const commandUID = "test:sample";

        const error = new CommandIsNotFoundError(commandUID);

        expect(error.name).toBe(ERROR_COMMAND_IS_NOT_FOUND);
        expect(error.message).toBe("Command is not found");

        expect(error.commandUID).toBe(commandUID);
      },
    );
  },
);
