import { jest } from "@jest/globals";

import { createCLI } from "../createCLI";
import { runCLI } from "../runCLI";

describe(
  "runCLI",
  () =>
  {
    it(
      "should print the help message",
      async () =>
      {
        const cli = createCLI();

        const superExit = process.exit.bind(process);
        const exitMock = jest.fn();
        // @ts-expect-error - Mock-only.
        process.exit = exitMock;

        await runCLI(cli, []);

        expect(exitMock).toHaveBeenCalled();

        process.exit = superExit;
      },
    );
  },
);
