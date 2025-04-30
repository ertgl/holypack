import type { Linter } from "eslint";
import type GlobalsModule from "globals";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationGlobalsPlugin } from "./plugin";
import type { ESLintIntegrationGlobalsPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationGlobalsPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationGlobalsPluginAPI
{
  plugin: ESLintIntegrationGlobalsPlugin;

  constructor(
    plugin: ESLintIntegrationGlobalsPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationGlobalsPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationGlobalsPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "globals";

    let globals: null | typeof GlobalsModule = null;

    try
    {
      const globalsModule = await import(
        packageName,
      ) as {
        default: typeof GlobalsModule;
      };

      globals = globalsModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (globals == null)
    {
      return;
    }

    configs.push(
      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
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
          GLOB_PATTERN_JS_JSX_TS_TSX,
        ],
        languageOptions: {
          // TODO(ertgl): Support specifying project type, so we can treat JS/JSX files as server/browser/isomorphic modules. For now, isomorphic is the default.
          globals: {
            ...globals.browser,
            ...globals.builtin,
            ...globals.commonjs,
            ...globals.es2025,
            ...globals.node,
            ...globals.nodeBuiltin,
          },
        },
      },

      {
        files: [
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
        languageOptions: {
          globals: {
            ...globals.builtin,
            ...globals.es2025,
          },
        },
      },
    );
  }
}
