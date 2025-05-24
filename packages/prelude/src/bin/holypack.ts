#!/usr/bin/env node

import {
  createCLI,
  runCLI,
} from "@holypack/cli";

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
