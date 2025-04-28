import type { Linter } from "eslint";
import type PluginJSDocModule from "eslint-plugin-jsdoc";

import type { TypeSafeContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
  GLOB_PATTERN_CTS_MTS_TS,
  GLOB_PATTERN_CTSX_MTSX_TSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationJSDocPlugin } from "./plugin";
import type { ESLintIntegrationJSDocPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationJSDocPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationJSDocPluginAPI
{
  plugin: ESLintIntegrationJSDocPlugin;

  constructor(
    plugin: ESLintIntegrationJSDocPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: TypeSafeContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationJSDocPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationJSDocPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "eslint-plugin-jsdoc";

    let pluginJSDoc: null | typeof PluginJSDocModule = null;

    try
    {
      const pluginJSDocModule = await import(
        packageName,
      ) as {
        default: typeof PluginJSDocModule;
      };

      pluginJSDoc = pluginJSDocModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (pluginJSDoc == null)
    {
      return;
    }

    configs.push(
      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
        plugins: {
          jsdoc: pluginJSDoc,
        },
      },

      {
        ...pluginJSDoc.configs["flat/recommended"],
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CJSX_JSX_MJSX,
        ],
      },

      {
        ...pluginJSDoc.configs["flat/recommended-typescript"],
        files: [
          GLOB_PATTERN_CTS_MTS_TS,
          GLOB_PATTERN_CTSX_MTSX_TSX,
        ],
      },

      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
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
          GLOB_PATTERN_CTS_MTS_TS,
          GLOB_PATTERN_CTSX_MTSX_TSX,
        ],
        rules: {
          "jsdoc/require-param-type": "off",
          "jsdoc/require-returns": "off",
        },
      },
    );
  }
}
