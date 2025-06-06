import type CSpellPluginModule from "@cspell/eslint-plugin";
import type { Linter } from "eslint";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/sub-plugins/warning-monitor/utils/warning-emitter";

import { GLOB_PATTERN_ALL } from "../../constants/glob-patterns";

import type { ESLintIntegrationCSpellPlugin } from "./plugin";
import type { ESLintIntegrationCSpellPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationCSpellPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationCSpellPluginAPI
{
  plugin: ESLintIntegrationCSpellPlugin;

  constructor(
    plugin: ESLintIntegrationCSpellPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationCSpellPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationCSpellPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "@cspell/eslint-plugin";

    let cspellPlugin: null | typeof CSpellPluginModule = null;

    try
    {
      cspellPlugin = await import(
        packageName,
      ) as typeof CSpellPluginModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (cspellPlugin == null)
    {
      return;
    }

    configs.push({
      files: [
        GLOB_PATTERN_ALL,
      ],
      plugins: {
        "@cspell": cspellPlugin,
      },
      rules: {
        "@cspell/spellchecker": [
          "warn",
          resolvedOptions.overrides,
        ],
      },
    });
  }
}
