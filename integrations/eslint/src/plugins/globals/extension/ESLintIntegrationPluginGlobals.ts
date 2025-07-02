import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import type { AnyHook } from "@holypack/core/hook/AnyHook";
import type { AnyHookSync } from "@holypack/core/hook/AnyHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintContext } from "../../../context/ESLintContext";
import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC } from "../../../hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC";
import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC } from "../../../hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC";
import type { GenerateLinterConfigArrayHookAsync } from "../../../hooks/generate-linter-config-array/GenerateLinterConfigArrayHookAsync";
import type { GenerateLinterConfigArrayHookSync } from "../../../hooks/generate-linter-config-array/GenerateLinterConfigArrayHookSync";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import type { ESLintIntegrationPluginGlobalsOptions } from "../options/ESLintIntegrationPluginGlobalsOptions";

import type { ESLintIntegrationPluginGlobalsFacets } from "./ESLintIntegrationPluginGlobalsFacets";
import { ESLintPluginGlobalsConfiguratorFacet } from "./facets/ESLintPluginGlobalsConfiguratorFacet";
import { INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS } from "./INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS";

export class ESLintIntegrationPluginGlobals extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS;

  readonly facets: ESLintIntegrationPluginGlobalsFacets;

  readonly options: ESLintIntegrationPluginGlobalsOptions;

  constructor(
    options?: Optional<ESLintIntegrationPluginGlobalsOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new ESLintPluginGlobalsConfiguratorFacet(),
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
        this.configureESLintPluginGlobals.bind(
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
        this.configureESLintPluginGlobalsSync.bind(
          this,
          context,
        ),
      );
    }
  }

  async configureESLintPluginGlobals(
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

  configureESLintPluginGlobalsSync(
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
