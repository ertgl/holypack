import type MarkdownPluginModule from "@eslint/markdown";

import type { ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/module";

import { GLOB_PATTERN_MD } from "../../../constants/glob-patterns";

import type { ESLintIntegrationESLintMarkdownPlugin } from "./plugin";
import type { ESLintIntegrationESLintMarkdownPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationESLintMarkdownPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationESLintMarkdownPluginAPI
{
  plugin: ESLintIntegrationESLintMarkdownPlugin;

  constructor(
    plugin: ESLintIntegrationESLintMarkdownPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationESLintMarkdownPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationESLintMarkdownPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "@eslint/markdown";

    let markdownPlugin: null | typeof MarkdownPluginModule = null;

    try
    {
      const markdownPluginModule = await import(
        packageName,
      ) as {
        default: typeof MarkdownPluginModule;
      };

      markdownPlugin = markdownPluginModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (markdownPlugin == null)
    {
      return;
    }

    context.eslint.config.push(
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
              GLOB_PATTERN_MD,
            ],
            language: "markdown/gfm",
          };
        },
      ),

      {
        files: [
          GLOB_PATTERN_MD,
        ],
        rules: {
          // TODO(ertgl): Enable `markdown/no-missing-label-refs` ESLint rule when the related issue is fixed.
          // See: https://github.com/eslint/markdown/issues/294
          "markdown/no-missing-label-refs": "off",
        },
      },
    );
  }
}
