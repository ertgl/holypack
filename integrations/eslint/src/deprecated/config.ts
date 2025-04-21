// TODO(ertgl): Rewrite ESLint config resolution to be triggered on-demand basis by the plugin system.

import { createRequire } from "node:module";
import {
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
import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";
import {
  createTypeScriptImportResolver as createTypeScriptResolverForPluginImportX,
} from "eslint-import-resolver-typescript";
import {
  createNodeResolver as createNodeResolverForPluginImportX,
  default as pluginImportX,
} from "eslint-plugin-import-x";
import pluginJSDoc from "eslint-plugin-jsdoc";
import nodePlugin from "eslint-plugin-n";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import ymlPlugin from "eslint-plugin-yml";
import type fastGlobType from "fast-glob";
import globals from "globals";
import {
  type Config,
  default as typescriptPlugin,
} from "typescript-eslint";

import type { ConfigResolutionOptions } from "./config-resolution-options";

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

const { glob } = require("fast-glob") as typeof fastGlobType;

const PATTERN_ALL = "**/*";

const PATTERN_CJS_JS_MJS = "**/*.{cjs,js,mjs}";

const PATTERN_CJSX_JSX_MJSX = `${PATTERN_CJS_JS_MJS}x`;

const PATTERN_CTS_MTS_TS = "**/*.{cts,mts,ts}";

const PATTERN_CTSX_MTSX_TSX = `${PATTERN_CTS_MTS_TS}x`;

const PATTERN_CJS_CJSX_CTS_CTSX = `**/*.{cjs,cjsx,cts,ctsx}`;

const PATTERN_JS_JSX_TS_TSX = `**/*.{js,jsx,ts,tsx}`;

const PATTERN_MJS_MJSX_MTS_MTSX = `**/*.{mjs,mjsx,mts,mtsx}`;

const PATTERN_JSON = "**/*.json";

const PATTERN_JSON5 = "**/*.json5";

const PATTERN_JSONC = "**/*.jsonc";

const PATTERN_MD = "**/*.md";

const PATTERN_YAML_YML = "**/*.{yaml,yml}";

export async function resolveConfig(
  options?: ConfigResolutionOptions | null,
): Promise<Config>
{
  options ??= {};

  const cwd = options.cwd ?? process.cwd();

  const packageJSON = require(
    resolvePath(
      cwd,
      "package.json",
    ),
  ) as Record<string, unknown>;

  const workspaceDirPaths = (
    packageJSON.workspaces != null && Array.isArray(packageJSON.workspaces as string[])
      ? await glob(
        packageJSON.workspaces as string[],
        {
          absolute: true,
          cwd,
          onlyDirectories: true,
        },
      )
      : []
  );

  const eslintBaseLanguageOptions: Linter.Config["languageOptions"] = {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: cwd,
      warnOnUnsupportedTypeScriptVersion: false,
    },
  };

  const stylisticBaseCustomizationOptions: StylisticCustomizeOptions = {
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
      ...nodePlugin.configs["flat/recommended"],
      files: [
        PATTERN_JS_JSX_TS_TSX,
      ],
    },

    {
      ...nodePlugin.configs["flat/recommended-module"],
      files: [
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
    },

    {
      ...nodePlugin.configs["flat/recommended-script"],
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
      ],
    },

    {
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
        PATTERN_JS_JSX_TS_TSX,
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      settings: {
        n: {
          allowModules: [
            ...Object.keys(packageJSON.devDependencies ?? {}),
            ...Object.keys(packageJSON.resolution ?? {}),
          ],
          resolverConfig: {
            extensions: [
              ".ts",
              ".tsx",
              ".js",
              ".jsx",
              ".mts",
              ".mtsx",
              ".mjs",
              ".mjsx",
              ".cts",
              ".ctsx",
              ".cjs",
              ".cjsx",
              ".json",
              ".node",
            ],
            modules: [
              "node_modules",
            ],
            roots: [
              cwd,
            ],
          },
          tryExtensions: [
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".mts",
            ".mtsx",
            ".mjs",
            ".mjsx",
            ".cts",
            ".ctsx",
            ".cjsx",
            ".cjs",
            ".json",
            ".node",
          ],
        },
      },
    },

    {
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
        PATTERN_JS_JSX_TS_TSX,
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      rules: {
        "n/no-missing-import": "off",
      },
    },

    {
      ...pluginImportX.flatConfigs.recommended,
      files: [
        PATTERN_JS_JSX_TS_TSX,
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
    },

    {
      ...pluginImportX.flatConfigs.typescript,
      files: [
        PATTERN_JS_JSX_TS_TSX,
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
    },

    {
      settings: {
        "import-x/extensions": [
          ".d.ts",
          ".ts",
          ".tsx",
          ".js",
          ".jsx",
          ".json",
        ],
        "import-x/internal-regex": /(?:^@holypack[\\/])/.source,
        "import-x/parsers": {
          "@typescript-eslint/parser": [
            ".cjs",
            ".cjsx",
            ".cts",
            ".ctsx",
            ".js",
            ".jsx",
            ".mjs",
            ".mjsx",
            ".mts",
            ".mtsx",
            ".ts",
            ".tsx",
          ],
        },
        "import-x/resolver": {
          node: {
            extensions: [
              ".mts",
              ".mtsx",
              ".mjs",
              ".mjsx",
              ".cts",
              ".ctsx",
              ".cjs",
              ".cjsx",
            ],
          },
          typescript: true,
        },
        "import-x/resolver-next": [
          createTypeScriptResolverForPluginImportX(),
          createNodeResolverForPluginImportX(),
        ],
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
      // eslint-disable-next-line import-x/no-named-as-default-member
      ...stylisticPlugin.configs.customize({
        ...stylisticBaseCustomizationOptions,
      }),
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CTS_MTS_TS,
      ],
    },

    {
      // eslint-disable-next-line import-x/no-named-as-default-member
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
              /^holypack$/iu.source,
            ],
            newlinesBetween: "always",
            tsconfigRootDir: cwd,
          },
        ],
      },
    },

    {
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
        PATTERN_JS_JSX_TS_TSX,
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      plugins: {
        jsdoc: pluginJSDoc,
      },
    },

    {
      ...pluginJSDoc.configs["flat/recommended"],
      files: [
        PATTERN_CJS_JS_MJS,
        PATTERN_CJSX_JSX_MJSX,
      ],
    },

    {
      ...pluginJSDoc.configs["flat/recommended-typescript"],
      files: [
        PATTERN_CTS_MTS_TS,
        PATTERN_CTSX_MTSX_TSX,
      ],
    },

    {
      files: [
        PATTERN_CJS_CJSX_CTS_CTSX,
        PATTERN_JS_JSX_TS_TSX,
        PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      rules: {
        "jsdoc/check-access": "warn",
        "jsdoc/check-alignment": "warn",
        "jsdoc/check-examples": "off",
        "jsdoc/check-indentation": [
          "warn",
          {
            excludeTags: [
              "example",
              "import",
            ],
          },
        ],
        "jsdoc/check-line-alignment": "warn",
        "jsdoc/check-param-names": "warn",
        "jsdoc/check-property-names": "warn",
        "jsdoc/check-syntax": "warn",
        "jsdoc/check-tag-names": [
          "warn",
          {
            typed: false,
          },
        ],
        "jsdoc/check-template-names": "warn",
        "jsdoc/check-types": "warn",
        "jsdoc/check-values": "warn",
        "jsdoc/empty-tags": "warn",
        "jsdoc/implements-on-classes": "warn",
        "jsdoc/informative-docs": "warn",
        "jsdoc/match-description": "warn",
        "jsdoc/multiline-blocks": "warn",
        "jsdoc/no-bad-blocks": "warn",
        "jsdoc/no-blank-block-descriptions": "warn",
        "jsdoc/no-defaults": "warn",
        "jsdoc/no-missing-syntax": "off",
        "jsdoc/no-multi-asterisks": "warn",
        "jsdoc/no-restricted-syntax": "off",
        "jsdoc/no-types": "off",
        "jsdoc/no-undefined-types": [
          "off",
          {
            mode: "typescript",
          },
        ],
        "jsdoc/require-asterisk-prefix": "warn",
        "jsdoc/require-description": [
          "off",
          {
            descriptionStyle: "tag",
          },
        ],
        "jsdoc/require-description-complete-sentence": "warn",
        "jsdoc/require-example": "off",
        "jsdoc/require-file-overview": "off",
        "jsdoc/require-hyphen-before-param-description": "warn",
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param": "off",
        "jsdoc/require-param-description": "off",
        "jsdoc/require-param-name": "warn",
        "jsdoc/require-param-type": "warn",
        "jsdoc/require-property": "off",
        "jsdoc/require-property-description": "off",
        "jsdoc/require-property-name": "warn",
        "jsdoc/require-property-type": "warn",
        "jsdoc/require-returns": "warn",
        "jsdoc/require-returns-check": "warn",
        "jsdoc/require-returns-description": "off",
        "jsdoc/require-returns-type": "warn",
        "jsdoc/require-template": "warn",
        "jsdoc/require-throws": "warn",
        "jsdoc/require-yields": "off",
        "jsdoc/require-yields-check": "warn",
        "jsdoc/sort-tags": "warn",
        "jsdoc/tag-lines": "warn",
        "jsdoc/valid-types": "warn",
      },
    },

    {
      files: [
        PATTERN_CTS_MTS_TS,
        PATTERN_CTSX_MTSX_TSX,
      ],
      rules: {
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns": "off",
      },
    },

    {
      ...jsonPlugin.configs.recommended,
      files: [
        PATTERN_JSON,
        PATTERN_JSON5,
        PATTERN_JSONC,
      ],
    },

    {
      files: [
        PATTERN_JSON,
      ],
      language: "json/json",
    },

    {
      files: [
        PATTERN_JSON5,
      ],
      language: "json/json5",
    },

    {
      files: [
        PATTERN_JSONC,
      ],
      language: "json/jsonc",
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
