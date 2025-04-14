// Note:
// This file is used to build the Babel integration. The other packages that
// need to be built using the Babel integration will use the configuration
// resolved by the integration. So, this file is bootstrap-phase only.

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/**
 * @import { type TransformOptions } from "@babel/core";
 * @import {
 *   type Options as ImportSourceTransformerPluginOptions,
 * } from "babel-plugin-transform-import-source";
 */

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

const TARGET_EXTENSION = ".cjs";

/**
 * @type {ImportSourceTransformerPluginOptions}
 */
const importSourceTransformerPluginOptions = {
  transform: {
    rules: [
      {
        find: /(?:\.[cm]?[jt]s[x]?)?$/iu,
        replace: TARGET_EXTENSION,
        resolveIndex: true,
        test: /^[.\\/]+.*$/,
      },
    ],
  },
};

/**
 * @type {TransformOptions}
 */
const BABEL_CONFIG = {
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
        modules: "commonjs",
      },
    ],

    [
      require.resolve("@babel/preset-typescript"),
      {},
    ],
  ],

  sourceMaps: true,
};

export default BABEL_CONFIG;
