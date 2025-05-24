import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import holypackLegacyPreset from "@holypack/babel-preset/legacy";

import { META_LIB } from "../contrib/comment-attributes/meta-lib.mjs";

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
export function legacyConfigFunction(
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
      CJS: true,
      ESM: false,
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
        holypackLegacyPreset,
        {},
      ],
    ],

    sourceType: "unambiguous",
  };

  return transformOptions;
}
