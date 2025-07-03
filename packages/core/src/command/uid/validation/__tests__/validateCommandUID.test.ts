import { jest } from "@jest/globals";

import { createCommandSync } from "../../../factory/createCommandSync";
import { CommandUIDIsNotDefinedError } from "../errors/CommandUIDIsNotDefinedError";
import { validateCommandUID } from "../validateCommandUID";

describe(
  "validateCommandUID",
  () =>
  {
    it(
      "should throw an error if the command UID is `undefined`",
      () =>
      {
        const command = createCommandSync({
          handler: jest.fn(),
          uid: undefined as unknown as string,
        });

        expect(
          () =>
          {
            validateCommandUID(
              command.uid,
              command,
            );
          },
        ).toThrow(
          CommandUIDIsNotDefinedError,
        );
      },
    );

    it(
      "should throw an error if the command UID is an empty string",
      () =>
      {
        const command = createCommandSync({
          handler: jest.fn(),
          uid: "",
        });

        expect(
          () =>
          {
            validateCommandUID(
              command.uid,
              command,
            );
          },
        ).toThrow(
          CommandUIDIsNotDefinedError,
        );
      },
    );

    it(
      "should not throw any error if the command UID is valid",
      () =>
      {
        const command = createCommandSync({
          handler: jest.fn(),
          uid: "test:sample",
        });

        expect(
          () =>
          {
            validateCommandUID(
              command.uid,
              command,
            );
          },
        ).not.toThrow();
      },
    );
  },
);
