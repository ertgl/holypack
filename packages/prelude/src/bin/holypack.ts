#!/usr/bin/env node

import { createCLI } from "@holypack/cli/createCLI";
import { runCLI } from "@holypack/cli/runCLI";

async function main(
  args?: null | readonly string[],
): Promise<void>
{
  await runCLI(
    createCLI(),
    args,
  );
}

// #[cjs(voidify)]
await main(process.argv);
