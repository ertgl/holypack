import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import holypackPreset from "@holypack/babel-preset";

import { META_LIB } from "./contrib/comment-attributes/meta-lib.mjs";

/**
 * @import {
 *   type ConfigAPI,
 *   type TransformOptions,
 * } from "@babel/core";
 * @import {
 *   type Options as CommentAttributesPluginOptions,
 * } from "babel-plugin-comment-attributes";
 */

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

/**
 * @param {ConfigAPI} api
 * @returns {TransformOptions}
 */
export function configFunction(
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
      ...META_LIB,
      CJS: false,
      ESM: true,
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
        holypackPreset,
        {},
      ],
    ],

    sourceType: "unambiguous",
  };

  return transformOptions;
}
