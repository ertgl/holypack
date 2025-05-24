import { jest } from "@jest/globals";
import { Command } from "commander";

import {
  createCLI,
  runCLI,
} from "../cli";

describe(
  "createCLI",
  () =>
  {
    it(
      "should create a CLI instance",
      () =>
      {
        const cli = createCLI();

        expect(cli.program).toBeInstanceOf(Command);
      },
    );
  },
);

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
