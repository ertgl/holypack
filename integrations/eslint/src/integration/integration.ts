import {
  bindSubIntegration,
  type Config,
  type Context,
  type ContextResolutionOptions,
  type Integration,
  type ResolvedContext,
} from "@holypack/core";

import {
  createESLintIntegrationHookSet,
  type ESLintIntegrationHookSet,
} from "../eventing";
import createESLintIntegrationCSpellPlugin from "../plugins/cspell";
import createESLintIntegrationESLintJSPlugin from "../plugins/eslint/js";
import createESLintIntegrationESLintJSONPlugin from "../plugins/eslint/json";
import createESLintIntegrationESLintMarkdownPlugin from "../plugins/eslint/markdown";
import createESLintIntegrationGlobalsPlugin from "../plugins/globals";
import createESLintIntegrationIgnoresPlugin from "../plugins/ignores";
import createESLintIntegrationImportXPlugin from "../plugins/import-x";
import createESLintIntegrationJSDocPlugin from "../plugins/jsdoc";
import createESLintIntegrationNPlugin from "../plugins/n";
import createESLintIntegrationPerfectionistPlugin from "../plugins/perfectionist";
import createESLintIntegrationStylisticPlugin from "../plugins/stylistic";
import createESLintIntegrationTypeScriptPlugin from "../plugins/typescript";
import createESLintIntegrationYMLPlugin from "../plugins/yml";

import { INTEGRATION_NAME_ESLINT } from "./integration-name";
import type { ESLintIntegrationOptions } from "./integration-options";

export class ESLintIntegration implements Integration
{
  hooks: ESLintIntegrationHookSet;

  name = INTEGRATION_NAME_ESLINT;

  options: ESLintIntegrationOptions;

  constructor(
    options?: ESLintIntegrationOptions | null,
  )
  {
    this.hooks = createESLintIntegrationHookSet();
    this.options = options ?? {};
  }

  async onContextReady(
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    // TODO(ertgl): Consider using an isolated pointer for the config, as independent of the context.
    await this.hooks.configGeneration.promise(resolvedContext);
    await this.hooks.postConfigGeneration.promise(resolvedContext.eslint.config);
  }

  resolveContext(
    context: Context,
    options: ContextResolutionOptions,
  ): void
  {
    context.eslint = {
      config: [],
    };
  }

  async setup(
    context: Context,
    config: Config,
  ): Promise<void>
  {
    const cspellPlugin = createESLintIntegrationCSpellPlugin();
    await bindSubIntegration(context, config, cspellPlugin);

    const eslintJSPlugin = createESLintIntegrationESLintJSPlugin();
    await bindSubIntegration(context, config, eslintJSPlugin);

    const typescriptPlugin = createESLintIntegrationTypeScriptPlugin();
    await bindSubIntegration(context, config, typescriptPlugin);

    const nPlugin = createESLintIntegrationNPlugin();
    await bindSubIntegration(context, config, nPlugin);

    const importXPlugin = createESLintIntegrationImportXPlugin();
    await bindSubIntegration(context, config, importXPlugin);

    const globalsPlugin = createESLintIntegrationGlobalsPlugin();
    await bindSubIntegration(context, config, globalsPlugin);

    const stylisticPlugin = createESLintIntegrationStylisticPlugin();
    await bindSubIntegration(context, config, stylisticPlugin);

    const perfectionistPlugin = createESLintIntegrationPerfectionistPlugin();
    await bindSubIntegration(context, config, perfectionistPlugin);

    const jsdocPlugin = createESLintIntegrationJSDocPlugin();
    await bindSubIntegration(context, config, jsdocPlugin);

    const eslintJSONPlugin = createESLintIntegrationESLintJSONPlugin();
    await bindSubIntegration(context, config, eslintJSONPlugin);

    const eslintMarkdownPlugin = createESLintIntegrationESLintMarkdownPlugin();
    await bindSubIntegration(context, config, eslintMarkdownPlugin);

    const ymlPlugin = createESLintIntegrationYMLPlugin();
    await bindSubIntegration(context, config, ymlPlugin);

    const ignoresPlugin = createESLintIntegrationIgnoresPlugin();
    await bindSubIntegration(context, config, ignoresPlugin);
  }
}

export function createESLintIntegration(
  options?: ESLintIntegrationOptions | null,
): ESLintIntegration
{
  return new ESLintIntegration(options);
}
