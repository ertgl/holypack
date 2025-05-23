import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/**
 * @import {
 *   type ConfigAPI,
 *   type TransformOptions,
 * } from "@babel/core";
 * @import { type Options as BabelEnvPresetOptions } from "@babel/preset-env";
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
export function bootstrapConfigFunction(
  api,
)
{
  api.cache.invalidate(
    () => process.env.NODE_ENV,
  );

  /**
   * @type {ImportSourceTransformerPluginOptions}
   */
  const importSourceTransformerPluginOptions = {
    transform: {
      rules: [
        {
          find: /(?:\.[cm]?[jt]s[x]?)?$/iu,
          replace: ".mjs",
          resolveIndex: true,
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
    ignoreBrowserslistConfig: true,
    modules: false,
    targets: {
      esmodules: true,
      node: "current",
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
        envPresetOptions,
      ],

      [
        require.resolve("@babel/preset-typescript"),
        {
          dts: true,
        },
      ],
    ],

    sourceType: "unambiguous",
  };

  return transformOptions;
}
