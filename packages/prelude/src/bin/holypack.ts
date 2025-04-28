#!/usr/bin/env node

import {
  format as prettyFormat,
  plugins as prettyFormatPlugins,
} from "pretty-format";

import { resolveContext } from "@holypack/core";

async function main(): Promise<void>
{
  const context = await resolveContext();
  console.log(
    prettyFormat(
      context,
      {
        highlight: true,
        indent: 2,
        plugins: [
          prettyFormatPlugins.Immutable,
        ],
      },
    ),
  );
}

// #[cjs(voidify)]
await main();
