import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { META_GLOBALS } from "../../../lib/comment-attributes/META_GLOBALS.cjs";

/**
 * @import {
 *   type ConfigAPI,
 *   type TransformOptions,
 * } from "@babel/core";
 * @import { type Options as BabelEnvPresetOptions } from "@babel/preset-env";
 * @import {
 *   type Options as CommentAttributesPluginOptions,
 * } from "babel-plugin-comment-attributes";
 * @import {
 *   type Options as ImportSourceTransformerPluginOptions,
 * } from "babel-plugin-transform-import-source";
 */

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

/**
 * @param {ConfigAPI} api
 * @returns {TransformOptions}
 */
export function generateBootstrapCJSConfigFunction(
  api,
)
{
  api.cache.invalidate(
    () => process.env.NODE_ENV,
  );

  /**
   * @type {CommentAttributesPluginOptions}
   */
  const commentAttributesPluginOptions = {
    context: {
      ...META_GLOBALS,
      CJS: true,
      ESM: false,
    },
  };

  /**
   * @type {ImportSourceTransformerPluginOptions}
   */
  const importSourceTransformerPluginOptions = {
    transform: {
      rules: [
        {
          find: /(?:\.[cm]?[jt]s[x]?)?$/iu,
          replace: ".cjs",
          resolveIndex: {
            extensions: [
              ".ts",
            ],
            fallback: "index",
            prioritize: true,
          },
          test: /^[.\\/]+.*$/,
        },
      ],
    },
  };

  /**
   * @type {BabelEnvPresetOptions}
   */
  const envPresetOptions = {
    bugfixes: true,
    exclude: [
      "@babel/plugin-transform-regenerator",
    ],
    ignoreBrowserslistConfig: true,
    modules: "commonjs",
    targets: {
      node: "current",
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

      [
        require.resolve("babel-plugin-transform-import-source"),
        importSourceTransformerPluginOptions,
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

  return transformOptions;
}
