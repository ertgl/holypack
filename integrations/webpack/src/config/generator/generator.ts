import { resolve as resolvePath } from "node:path";

import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import type { WebpackConfigGeneratorOptions } from "./options";

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateWebpackConfig(
  context: Context,
  options?: null | WebpackConfigGeneratorOptions,
): Promise<Configuration>
{
  const overrides = options?.overrides ?? {};

  // TODO(ertgl): Implement the actual config generation logic for webpack.

  const contextDirectoryPath = overrides.context ?? context.cwd;

  const entry = overrides.entry ?? {
    main: "./src/main.js",
  };

  const output = overrides.output ?? {
    path: resolvePath(contextDirectoryPath, "dist"),
  };

  return {
    ...overrides,
    context: contextDirectoryPath,
    entry,
    output,
  };
}
