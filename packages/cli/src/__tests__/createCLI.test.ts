import { Command } from "commander";

import { createCLI } from "../createCLI";

describe(
  "createCLI",
  () =>
  {
    it(
      "should return a CLI instance",
      () =>
      {
        const cli = createCLI();

        expect(cli.program).toBeInstanceOf(Command);
      },
    );
  },
);
