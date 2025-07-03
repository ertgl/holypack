import { jest } from "@jest/globals";

import { resolveContextSync } from "../../../context/resolver/resolveContextSync";
import { createCommandSync } from "../../factory/createCommandSync";
import { bindCommandSync } from "../bindCommandSync";
import { CommandIsAlreadyBoundError } from "../errors/CommandIsAlreadyBoundError";

describe(
  "bindCommandSync",
  () =>
  {
    it(
      "should throw an error if the command is already bound",
      () =>
      {
        const command = createCommandSync({
          handler: jest.fn(),
          uid: "test:sample",
        });

        const context = resolveContextSync({
          loadConfigFile: false,
        });

        bindCommandSync(
          context,
          command,
        );

        expect(
          () =>
          {
            bindCommandSync(
              context,
              command,
            );
          },
        ).toThrow(
          CommandIsAlreadyBoundError,
        );
      },
    );
  },
);
