import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import { maybeBindExtensionAsync } from "@holypack/core/extension/binder/maybeBindExtensionAsync";
import { maybeBindExtensionSync } from "@holypack/core/extension/binder/maybeBindExtensionSync";
import { maybeBindExtensionHookAsync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import { createGenerateLinterConfigArrayHookAsync } from "../hooks/generate-linter-config-array/createGenerateLinterConfigArrayHookAsync";
import { createGenerateLinterConfigArrayHookSync } from "../hooks/generate-linter-config-array/createGenerateLinterConfigArrayHookSync";
import type { ESLintIntegrationOptions } from "../options/ESLintIntegrationOptions";
import { createESLintIntegrationPluginCSpell } from "../plugins/cspell/extension/createESLintIntegrationPluginCSpell";
import { createESLintIntegrationPluginGlobalIgnores } from "../plugins/eslint/global-ignores/extension/createESLintIntegrationPluginGlobalIgnores";
import { createESLintIntegrationPluginJS } from "../plugins/eslint/js/extension/createESLintIntegrationPluginJS";
import { createESLintIntegrationPluginJSON } from "../plugins/eslint/json/extension/createESLintIntegrationPluginJSON";
import { createESLintIntegrationPluginMarkdown } from "../plugins/eslint/markdown/extension/createESLintIntegrationPluginMarkdown";
import { createESLintIntegrationPluginGlobals } from "../plugins/globals/extension/createESLintIntegrationPluginGlobals";
import { createESLintIntegrationPluginImportX } from "../plugins/import-x/extension/createESLintIntegrationPluginImportX";
import { createESLintIntegrationPluginJSDoc } from "../plugins/jsdoc/extension/createESLintIntegrationPluginJSDoc";
import { createESLintIntegrationPluginN } from "../plugins/n/extension/createESLintIntegrationPluginN";
import { createESLintIntegrationPluginPerfectionist } from "../plugins/perfectionist/extension/createESLintIntegrationPluginPerfectionist";
import { createESLintIntegrationPluginStylistic } from "../plugins/stylistic/extension/createESLintIntegrationPluginStylistic";
import { createESLintIntegrationPluginTypeScript } from "../plugins/typescript/extension/createESLintIntegrationPluginTypeScript";
import { createESLintIntegrationPluginYML } from "../plugins/yml/extension/createESLintIntegrationPluginYML";

import type { ESLintIntegrationFacets } from "./ESLintIntegrationFacets";
import { ESLintConfiguratorFacet } from "./facets/ESLintConfiguratorFacet";
import { INTEGRATION_UID_ESLINT } from "./INTEGRATION_UID_ESLINT";

export class ESLintIntegration extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_ESLINT;

  readonly facets: ESLintIntegrationFacets;

  readonly options: ESLintIntegrationOptions;

  constructor(
    options?: Optional<ESLintIntegrationOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new ESLintConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  async $augmentContext(
    context: ContextAsync,
  ): Promise<void>
  {
    const pluginOptions = this.options.plugins ?? {};

    if (pluginOptions.cspell !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginCSpell(pluginOptions.cspell),
      );
    }

    if (pluginOptions.javascript !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginJS(pluginOptions.javascript),
      );
    }

    if (pluginOptions.typescript !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginTypeScript(pluginOptions.typescript),
      );
    }

    if (pluginOptions.globals !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginGlobals(pluginOptions.globals),
      );
    }

    if (pluginOptions.importX !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginImportX(pluginOptions.importX),
      );
    }

    if (pluginOptions.n !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginN(pluginOptions.n),
      );
    }

    if (pluginOptions.jsdoc !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginJSDoc(pluginOptions.jsdoc),
      );
    }

    if (pluginOptions.perfectionist !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginPerfectionist(pluginOptions.perfectionist),
      );
    }

    if (pluginOptions.stylistic !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginStylistic(pluginOptions.stylistic),
      );
    }

    if (pluginOptions.json !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginJSON(pluginOptions.json),
      );
    }

    if (pluginOptions.markdown !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginMarkdown(pluginOptions.markdown),
      );
    }

    if (pluginOptions.yml !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginYML(pluginOptions.yml),
      );
    }

    if (pluginOptions.ignores !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createESLintIntegrationPluginGlobalIgnores(pluginOptions.ignores),
      );
    }
  }

  $augmentContextSync(
    context: ContextSync,
  ): void
  {
    const pluginOptions = this.options.plugins ?? {};

    if (pluginOptions.cspell !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginCSpell(pluginOptions.cspell),
      );
    }

    if (pluginOptions.javascript !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginJS(pluginOptions.javascript),
      );
    }

    if (pluginOptions.typescript !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginTypeScript(pluginOptions.typescript),
      );
    }

    if (pluginOptions.globals !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginGlobals(pluginOptions.globals),
      );
    }

    if (pluginOptions.importX !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginImportX(pluginOptions.importX),
      );
    }

    if (pluginOptions.n !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginN(pluginOptions.n),
      );
    }

    if (pluginOptions.jsdoc !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginJSDoc(pluginOptions.jsdoc),
      );
    }

    if (pluginOptions.perfectionist !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginPerfectionist(pluginOptions.perfectionist),
      );
    }

    if (pluginOptions.stylistic !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginStylistic(pluginOptions.stylistic),
      );
    }

    if (pluginOptions.json !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginJSON(pluginOptions.json),
      );
    }

    if (pluginOptions.markdown !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginMarkdown(pluginOptions.markdown),
      );
    }

    if (pluginOptions.yml !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginYML(pluginOptions.yml),
      );
    }

    if (pluginOptions.ignores !== false)
    {
      maybeBindExtensionSync(
        context,
        createESLintIntegrationPluginGlobalIgnores(pluginOptions.ignores),
      );
    }
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createGenerateLinterConfigArrayHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createGenerateLinterConfigArrayHookSync(),
    );
  }

  async generateLinterConfigArray(
    context: ContextAsync,
  ): Promise<Linter.Config[]>
  {
    return await this.facets.configurator.generateLinterConfigArray(context);
  }

  generateLinterConfigArraySync(
    context: ContextSync,
  ): Linter.Config[]
  {
    return this.facets.configurator.generateLinterConfigArraySync(context);
  }
}
