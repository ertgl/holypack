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

import type { ESLintIntegrationOptions } from "./integration-options";

export const INTEGRATION_NAME_ESLINT = "@holypack/integration:ESLint";

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
    const { createESLintIntegrationCSpellPlugin } = await import("../plugins/cspell");
    const cspellPlugin = createESLintIntegrationCSpellPlugin();
    await bindSubIntegration(context, config, cspellPlugin);

    const { createESLintIntegrationESLintJSPlugin } = await import("../plugins/eslint/js");
    const eslintJSPlugin = createESLintIntegrationESLintJSPlugin();
    await bindSubIntegration(context, config, eslintJSPlugin);
  }
}

export function createESLintIntegration(
  options?: ESLintIntegrationOptions | null,
): ESLintIntegration
{
  return new ESLintIntegration(options);
}
