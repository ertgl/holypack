import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/**
 * @import { type TransformOptions } from "@babel/core";
 * @import {
 *   type Options as ImportSourceTransformerPluginOptions,
 * } from "babel-plugin-transform-import-source";
 * @import { BabelConfigResolutionOptions } from "./resolution-options.mjs";
 */

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

/**
 * @param {BabelConfigResolutionOptions | null} [options]
 * @returns {TransformOptions}
 * @throws {Error}
 */
export function resolveBabelConfig(
  options,
)
{
  options ??= {};

  const targetExtension = options.targetExtension ?? "";

  if (targetExtension.length === 0)
  {
    const err = new Error("No target extension specified");
    throw err;
  }

  const isCJS = targetExtension.endsWith(".cjs");
  const isESM = targetExtension.endsWith(".mjs");

  /**
   * @type {ImportSourceTransformerPluginOptions}
   */
  const importSourceTransformerPluginOptions = {
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

  /**
   * @type {TransformOptions}
   */
  const transformOptions = {
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
