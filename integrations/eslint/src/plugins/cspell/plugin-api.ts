import type CSpellPluginModule from "@cspell/eslint-plugin";

import type { ResolvedContext } from "@holypack/core";

import { GLOB_PATTERN_ALL } from "../../constants";

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

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationCSpellPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "@cspell/eslint-plugin";
    try
    {
      const cspellPlugin = await import(
        packageName,
      ) as typeof CSpellPluginModule;

      const resolvedOptions = resolveESLintIntegrationCSpellPluginOptions(
        context.cwd,
        options,
      );

      if (!resolvedOptions)
      {
        return;
      }

      context.eslint.config.push({
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
    catch (err)
    {
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
      return;
    }
  }
}
