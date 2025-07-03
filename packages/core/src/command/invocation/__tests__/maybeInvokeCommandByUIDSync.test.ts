import { jest } from "@jest/globals";

import { resolveContextSync } from "../../../context/resolver/resolveContextSync";
import { bindCommandSync } from "../../binder/bindCommandSync";
import { createCommandSync } from "../../factory/createCommandSync";
import type { CommandHandlerSync } from "../../handler/CommandHandlerSync";
import type { CommandPayloadSync } from "../../payload/CommandPayloadSync";
import { maybeInvokeCommandByUIDSync } from "../maybeInvokeCommandByUIDSync";

describe(
  "maybeInvokeCommandByUIDSync",
  () =>
  {
    it(
      "should load the command by the given UID then execute and return the result synchronously",
      () =>
      {
        const context = resolveContextSync({
          loadConfigFile: false,
        });

        const increaseNumber = (
          (
            payload: CommandPayloadSync<{ x: number }>,
          ): number =>
          {
            return payload.data.x + 1;
          }
        ) satisfies CommandHandlerSync;

        const increaseNumberMocked = jest.fn(increaseNumber);

        const command = createCommandSync({
          handler: increaseNumberMocked,
          uid: "test:sample",
        });

        bindCommandSync(
          context,
          command,
        );

        const result = maybeInvokeCommandByUIDSync(
          context,
          command.uid,
          {
            x: 1,
          },
        );

        expect(result).toBe(2);
      },
    );
  },
);
