import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import holypackPreset from "@holypack/babel-preset/default/sync/esm";

import { META_GLOBALS } from "../../lib/comment-attributes/META_GLOBALS.cjs";

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
export function generateESMConfigFunction(
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
