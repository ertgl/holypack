import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import type { AnyHook } from "@holypack/core/hook/AnyHook";
import type { AnyHookSync } from "@holypack/core/hook/AnyHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintContext } from "../../../../context/ESLintContext";
import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC } from "../../../../hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC";
import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC } from "../../../../hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC";
import type { GenerateLinterConfigArrayHookAsync } from "../../../../hooks/generate-linter-config-array/GenerateLinterConfigArrayHookAsync";
import type { GenerateLinterConfigArrayHookSync } from "../../../../hooks/generate-linter-config-array/GenerateLinterConfigArrayHookSync";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import type { ESLintIntegrationPluginMarkdownOptions } from "../options/ESLintIntegrationPluginMarkdownOptions";

import type { ESLintIntegrationPluginMarkdownFacets } from "./ESLintIntegrationPluginMarkdownFacets";
import { ESLintPluginMarkdownConfiguratorFacet } from "./facets/ESLintPluginMarkdownConfiguratorFacet";
import { INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN } from "./INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN";

export class ESLintIntegrationPluginMarkdown extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_ESLINT_PLUGIN_MARKDOWN;

  readonly facets: ESLintIntegrationPluginMarkdownFacets;

  readonly options: ESLintIntegrationPluginMarkdownOptions;

  constructor(
    options?: Optional<ESLintIntegrationPluginMarkdownOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new ESLintPluginMarkdownConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  $postBindExtensionHook(
    context: ContextAsync,
    extension: Extension,
    hook: AnyHook,
  ): void
  {
    if (hook.name === ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC)
    {
      const stage = (hook.taps.length + 1) * 1000;

      (hook as GenerateLinterConfigArrayHookAsync).tapPromise(
        {
          name: this.$uid,
          stage,
        },
        this.configureESLintPluginMarkdown.bind(
          this,
          context,
        ),
      );
    }
  }

  $postBindExtensionHookSync(
    context: ContextSync,
    extension: Extension,
    hook: AnyHookSync,
  ): void
  {
    if (hook.name === ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC)
    {
      const stage = (hook.taps.length + 1) * 1000;

      (hook as GenerateLinterConfigArrayHookSync).tap(
        {
          name: this.$uid,
          stage,
        },
        this.configureESLintPluginMarkdownSync.bind(
          this,
          context,
        ),
      );
    }
  }

  async configureESLintPluginMarkdown(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    await this.facets.configurator.configure(
      context,
      eslintContext,
      eslintIntegrationOptions,
      linterConfigArray,
    );
  }

  configureESLintPluginMarkdownSync(
    context: ContextSync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): void
  {
    this.facets.configurator.configureSync(
      context,
      eslintContext,
      eslintIntegrationOptions,
      linterConfigArray,
    );
  }
}
