import { jest } from "@jest/globals";

import { createCommandSync } from "../../../../factory/createCommandSync";
import { CommandUIDIsNotDefinedError } from "../CommandUIDIsNotDefinedError";
import { ERROR_COMMAND_UID_IS_NOT_DEFINED } from "../ERROR_COMMAND_UID_IS_NOT_DEFINED";

describe(
  "CommandUIDIsNotDefinedError",
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

        const error = new CommandUIDIsNotDefinedError(command);

        expect(error.name).toBe(ERROR_COMMAND_UID_IS_NOT_DEFINED);
        expect(error.message).toBe("Command UID is not defined");

        expect(error.command).toBe(command);
      },
    );
  },
);
