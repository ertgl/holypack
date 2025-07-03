import { jest } from "@jest/globals";

import { resolveContextAsync } from "../../../context/resolver/resolveContextAsync";
import { bindCommandAsync } from "../../binder/bindCommandAsync";
import { createCommandAsync } from "../../factory/createCommandAsync";
import type { CommandHandlerMaybeAsync } from "../../handler/CommandHandlerMaybeAsync";
import type { CommandPayloadAsync } from "../../payload/CommandPayloadAsync";
import { maybeInvokeCommandByUIDAsync } from "../maybeInvokeCommandByUIDAsync";

describe(
  "maybeInvokeCommandByUIDAsync",
  () =>
  {
    it(
      "should load the command by the given UID then execute and return the result",
      async () =>
      {
        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        const increaseNumber = (
          (
            payload: CommandPayloadAsync<{ x: number }>,
          ): number =>
          {
            return payload.data.x + 1;
          }
        ) satisfies CommandHandlerMaybeAsync;

        const increaseNumberMocked = jest.fn(increaseNumber);

        const command = createCommandAsync({
          handler: increaseNumberMocked,
          uid: "test:sample",
        });

        await bindCommandAsync(
          context,
          command,
        );

        const result = await maybeInvokeCommandByUIDAsync(
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
