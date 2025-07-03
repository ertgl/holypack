import { jest } from "@jest/globals";

import { resolveContextAsync } from "../../../context/resolver/resolveContextAsync";
import { createCommandAsync } from "../../factory/createCommandAsync";
import type { CommandHandlerMaybeAsync } from "../../handler/CommandHandlerMaybeAsync";
import type { CommandPayloadAsync } from "../../payload/CommandPayloadAsync";
import { invokeCommandAsync } from "../invokeCommandAsync";

describe(
  "invokeCommandAsync",
  () =>
  {
    it(
      "should execute the given command and return the result",
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

        const result = await invokeCommandAsync(
          context,
          command,
          {
            x: 1,
          },
        );

        expect(result).toBe(2);
      },
    );
  },
);
