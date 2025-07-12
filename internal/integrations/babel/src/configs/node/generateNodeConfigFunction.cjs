const { META_GLOBALS } = require("../../lib/comment-attributes/META_GLOBALS.cjs");

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

/**
 * @param {ConfigAPI} api
 * @returns {TransformOptions}
 */
module.exports.generateNodeConfigFunction = function generateNodeConfigFunction(
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
    exclude: [
      /\.config\.[cm]?js$/,
    ],

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

    retainLines: true,

    sourceMaps: "inline",

    sourceType: "unambiguous",
  };

  return transformOptions;
};
