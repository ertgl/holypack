import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { META_LIB } from "../comment-attributes/index.mjs";

/**
 * @import { type TransformOptions } from "@babel/core";
 * @import { type Options as BabelEnvPresetOptions } from "@babel/preset-env";
 * @import {
 *   type Options as CommentAttributesPluginOptions,
 * } from "babel-plugin-comment-attributes";
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
   * @type {CommentAttributesPluginOptions}
   */
  const commentAttributesPluginOptions = {
    context: {
      CJS: isCJS,
      ESM: isESM,
      ...META_LIB,
    },
  };

  /**
   * @type {BabelEnvPresetOptions}
   */
  const envPresetOptions = {
    bugfixes: true,
    ignoreBrowserslistConfig: true,
    modules: (
      isESM
        ? false
        : (
            isCJS
              ? "commonjs"
              : "auto"
          )
    ),
    targets: {
      esmodules: isESM || undefined,
      node: isESM ? "current" : true,
    },
  };

  /**
   * @type {TransformOptions}
   */
  const transformOptions = {
    plugins: [
      [
        require.resolve("babel-plugin-comment-attributes"),
        commentAttributesPluginOptions,
      ],
    ],

    presets: [
      [
        require.resolve("@babel/preset-env"),
        envPresetOptions,
      ],

      [
        require.resolve("@babel/preset-typescript"),
        {
          dts: true,
        },
      ],
    ],

    sourceMaps: true,

    sourceType: "unambiguous",
  };

  if (process.env.NODE_ENV !== "test")
  {
    transformOptions.plugins ??= [];

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

    transformOptions.plugins.push(
      [
        require.resolve("babel-plugin-transform-import-source"),
        importSourceTransformerPluginOptions,
      ],
    );
  }

  return transformOptions;
}
