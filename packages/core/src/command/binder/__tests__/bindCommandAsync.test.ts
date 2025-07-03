import { jest } from "@jest/globals";

import { resolveContextAsync } from "../../../context/resolver/resolveContextAsync";
import { createCommandAsync } from "../../factory/createCommandAsync";
import { bindCommandAsync } from "../bindCommandAsync";
import { CommandIsAlreadyBoundError } from "../errors/CommandIsAlreadyBoundError";

describe(
  "bindCommandAsync",
  () =>
  {
    it(
      "should throw an error if the command is already bound",
      async () =>
      {
        const command = createCommandAsync({
          handler: jest.fn(),
          uid: "test:sample",
        });

        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        await bindCommandAsync(
          context,
          command,
        );

        await expect(
          bindCommandAsync(
            context,
            command,
          ),
        ).rejects.toThrow(
          CommandIsAlreadyBoundError,
        );
      },
    );
  },
);
