import { jest } from "@jest/globals";

import { createCommandSync } from "../../../factory/createCommandSync";
import { CommandIsAlreadyBoundError } from "../CommandIsAlreadyBoundError";
import { ERROR_COMMAND_IS_ALREADY_BOUND } from "../ERROR_COMMAND_IS_ALREADY_BOUND";

describe(
  "CommandIsAlreadyBoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const command = createCommandSync({
          handler: jest.fn(),
          uid: "test:sample",
        });

        const error = new CommandIsAlreadyBoundError(command);

        expect(error.name).toBe(ERROR_COMMAND_IS_ALREADY_BOUND);
        expect(error.message).toBe("Command is already bound");

        expect(error.command).toBe(command);
      },
    );
  },
);
