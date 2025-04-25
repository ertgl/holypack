// TODO(ertgl): Rewrite Babel config resolution to be triggered on-demand basis by the plugin system.

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import type { TransformOptions } from "@babel/core";
import type { Options as ImportSourceTransformerPluginOptions } from "babel-plugin-transform-import-source";

import type { ConfigResolutionOptions } from "./config-resolution-options";

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

// eslint-disable-next-line @typescript-eslint/require-await
export async function resolveConfig(
  options?: ConfigResolutionOptions | null,
): Promise<TransformOptions>
{
  options ??= {};

  const targetExtension = options.targetExtension ?? "";

  if (targetExtension.length === 0)
  {
    const message = "The target extension is not specified.";
    throw new Error(message);
  }

  const isCJS = targetExtension.endsWith(".cjs");
  const isESM = targetExtension.endsWith(".mjs");

  const importSourceTransformerPluginOptions: ImportSourceTransformerPluginOptions = {
    transform: {
      rules: [
        {
          find: /(?:\.[cm]?[jt]s[x]?)?$/iu,
          replace: targetExtension,
          resolveIndex: true,
          test: /^[.\\/]+.*$/,
        },
      ],
    },
  };

  const transformOptions: TransformOptions = {
    plugins: [
      [
        require.resolve("babel-plugin-transform-import-source"),
        importSourceTransformerPluginOptions,
      ],
    ],

    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          modules: (
            isESM
              ? false
              : (
                  isCJS
                    ? "commonjs"
                    : "auto"
                )
          ),
        },
      ],

      [
        require.resolve("@babel/preset-typescript"),
        {
          dts: true,
        },
      ],
    ],

    sourceMaps: true,
  };

  return transformOptions;
}
