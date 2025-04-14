// TODO(ertgl): Rewrite ESLint config resolution to be triggered on-demand basis by the plugin system.

import { createRequire } from "node:module";
import {
  dirname,
  relative as getRelativePath,
  join as joinPaths,
  resolve as resolvePath,
} from "node:path";
import { fileURLToPath } from "node:url";

import cspellPlugin from "@cspell/eslint-plugin";
import javascriptPlugin from "@eslint/js";
import jsonPlugin from "@eslint/json";
import markdownPlugin from "@eslint/markdown";
import stylisticPlugin from "@stylistic/eslint-plugin";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import ymlPlugin from "eslint-plugin-yml";
import globals from "globals";
import typescriptPlugin from "typescript-eslint";

/**
 * @import { type StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
 * @import { type Linter } from "eslint";
 * @import { type default as fastGlobModule } from "fast-glob";
 * @import { type Config } from "typescript-eslint";
 */

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const require = createRequire(__dirname);

/**
 * @type {typeof fastGlobModule}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const fastGlob = require("fast-glob");
const { glob } = fastGlob;

const PATTERN_ALL = "**/*";

const PATTERN_CJS_JS_MJS = "**/*.{cjs,js,mjs}";

const PATTERN_CJSX_JSX_MJSX = `${PATTERN_CJS_JS_MJS}x`;

const PATTERN_CTS_MTS_TS = "**/*.{cts,mts,ts}";

const PATTERN_CTSX_MTSX_TSX = `${PATTERN_CTS_MTS_TS}x`;

const PATTERN_CJS_CJSX_CTS_CTSX = `**/*.{cjs,cjsx,cts,ctsx}`;

const PATTERN_JS_JSX_TS_TSX = `**/*.{js,jsx,ts,tsx}`;

const PATTERN_MJS_MJSX_MTS_MTSX = `**/*.{mjs,mjsx,mts,mtsx}`;

const PATTERN_JSON = "**/*.json";

const PATTERN_MD = "**/*.md";

const PATTERN_YAML_YML = "**/*.{yaml,yml}";

/**
 * @typedef {object} ConfigResolutionOptions
 * @property {string | null} [cwd]
 */

/**
 * @param {ConfigResolutionOptions | null} [options]
 * @returns {Promise<Config>}
 */
export async function resolveConfig(
  options,
)
{
  options ??= {};

  const cwd = options.cwd ?? process.cwd();

  /**
   * @type {Record<string, unknown>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const packageJSON = require(
    resolvePath(
      cwd,
      "package.json",
    ),
  );

  const workspaceDirPaths = (
    Array.isArray(packageJSON.workspaces)
      ? await glob(
        packageJSON.workspaces,
        {
          absolute: true,
          cwd,
          onlyDirectories: true,
        },
      )
      : []
  );

  /**
   * @type {Linter.Config["languageOptions"]}
   */
  const eslintBaseLanguageOptions = {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: cwd,
      warnOnUnsupportedTypeScriptVersion: false,
    },
  };

  /**
   * @type {StylisticCustomizeOptions}
   */
  const stylisticBaseCustomizationOptions = {
    arrowParens: true,
    blockSpacing: true,
    braceStyle: "allman",
    commaDangle: "always-multiline",
    indent: 2,
    jsx: false,
    quoteProps: "consistent-as-needed",
    quotes: "double",
    semi: true,
  };

  /**
   * @type {Config}
   */
  return typescriptPlugin.config([
    {
      files: [
        PATTERN_ALL,
      ],
      plugins: {
        "@cspell": cspellPlugin,
      },
      rules: {
        "@cspell/spellchecker": [
          "warn",
          {
            autoFix: false,
            checkComments: true,
            checkIdentifiers: true,
            checkJSXText: true,
            checkStrings: true,
            checkStringTemplates: true,
            configFile: resolvePath(
              cwd,
              "cspell.config.yaml",
            ),
            cspellOptionsRoot: cwd,
            generateSuggestions: true,
            ignoreImportProperties: false,
            ignoreImports: false,
            numSuggestions: 1,
          },
        ],
      },
    },

    {
      ...javascriptPlugin.configs.recommended,
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CJSX_JSX_MJSX,
      ],
    },

    {
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CJSX_JSX_MJSX,
      ],
      rules: {
        "no-unused-vars": [
          "warn",
          {
            args: "none",
          },
        ],
      },
    },

    ...typescriptPlugin.configs.strictTypeChecked.map(
      (config) =>
      {
        return {
          ...config,
          files: [
            PATTERN_CJS_JS_MJS,
            PATTERN_CJSX_JSX_MJSX,
            PATTERN_CTS_MTS_TS,
            PATTERN_CTSX_MTSX_TSX,
          ],
        };
      },
    ),

    {
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CJSX_JSX_MJSX,
        PATTERN_CTS_MTS_TS,
        PATTERN_CTSX_MTSX_TSX,
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-empty-object-type": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "none",
          },
        ],
      },
    },

    {
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
      ],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },

    {
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CTS_MTS_TS,
      ],
      languageOptions: {
        ...eslintBaseLanguageOptions,
      },
    },

    {
      files: [
        PATTERN_CJSX_JSX_MJSX,
        PATTERN_CTSX_MTSX_TSX,
      ],
      languageOptions: {
        ...eslintBaseLanguageOptions,
        parserOptions: {
          ...eslintBaseLanguageOptions.parserOptions,
          ecmaFeatures: {
            ...eslintBaseLanguageOptions.parserOptions?.ecmaFeatures,
            jsx: true,
          },
        },
      },
    },

    {
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
      ],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.commonjs,
          ...globals.node,
          ...globals.nodeBuiltin,
        },
      },
    },

    {
      files: [
        PATTERN_JS_JSX_TS_TSX,
      ],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.commonjs,
          ...globals.es2025,
        },
      },
    },

    {
      files: [
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.es2025,
        },
      },
    },

    {
      ...stylisticPlugin.configs.customize({
        ...stylisticBaseCustomizationOptions,
      }),
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CTS_MTS_TS,
      ],
    },

    {
      ...stylisticPlugin.configs.customize({
        ...stylisticBaseCustomizationOptions,
        jsx: true,
      }),
      files: [
        PATTERN_CJSX_JSX_MJSX,
        PATTERN_CTSX_MTSX_TSX,
      ],
    },

    {
      ...perfectionistPlugin.configs["recommended-natural"],
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CJSX_JSX_MJSX,
        PATTERN_CTS_MTS_TS,
        PATTERN_CTSX_MTSX_TSX,
      ],
    },

    {
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CJSX_JSX_MJSX,
        PATTERN_CTS_MTS_TS,
        PATTERN_CTSX_MTSX_TSX,
      ],
      rules: {
        "perfectionist/sort-imports": [
          "error",
          {
            customGroups: {
              type: {
                "node-type": /^node:.+$/iu.source,
              },
              value: {
                node: /^node:.+$/iu.source,
              },
            },
            groups: [
              [
                "node-type",
                "node",
                "builtin",
              ],
              [
                "type",
                "external",
              ],
              [
                "internal-type",
                "internal",
              ],
              [
                "parent-type",
                "parent",
              ],
              [
                "sibling-type",
                "sibling",
              ],
              [
                "index-type",
                "index",
              ],
              ["object"],
              ["unknown"],
            ],
            ignoreCase: false,
            internalPattern: [
              /^@holypack(?:[\\/].+)$/iu.source,
            ],
            newlinesBetween: "always",
            tsconfigRootDir: cwd,
          },
        ],
      },
    },

    {
      ...jsonPlugin.configs.recommended,
      files: [
        PATTERN_JSON,
      ],
      language: "json/json",
    },

    ...markdownPlugin.configs.recommended.map(
      (
      /**
       * @type {Record<string, unknown>}
       */
        config,
      ) =>
      {
        return {
          ...config,
          files: [
            PATTERN_MD,
          ],
          language: "markdown/gfm",
        };
      },
    ),

    {
      files: [
        PATTERN_MD,
      ],
      rules: {
        // Disable this until the issue gets resolved:
        // https://github.com/eslint/markdown/issues/294
        "markdown/no-missing-label-refs": "off",
      },
    },

    ...ymlPlugin.configs["flat/recommended"].map(
      (config) =>
      {
        return {
          ...config,
          files: [
            PATTERN_YAML_YML,
          ],
        };
      },
    ),

    {
      files: [
        PATTERN_YAML_YML,
      ],
      rules: {
        "yml/no-empty-mapping-value": "off",
      },
    },

    {
      ignores: [
        resolvePath(cwd, ".yarn"),
        resolvePath(cwd, "node_modules"),
      ].map(
        (absoluteIgnorePath) =>
        {
          return joinPaths(
            getRelativePath(cwd, absoluteIgnorePath),
            "**",
            "*",
          );
        },
      ),
    },

    {
      ignores: workspaceDirPaths.flatMap(
        (workspaceDirPath) =>
        {
          return [
            resolvePath(workspaceDirPath, "dist"),
            resolvePath(workspaceDirPath, "node_modules"),
          ].map(
            (absoluteIgnorePath) =>
            {
              return joinPaths(
                getRelativePath(cwd, absoluteIgnorePath),
                "**",
                "*",
              );
            },
          );
        },
      ),
    },
  ]);
}
