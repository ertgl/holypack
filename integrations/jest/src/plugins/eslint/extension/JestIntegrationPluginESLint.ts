// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import type { AnyHook } from "@holypack/core/hook/AnyHook";
import type { AnyHookSync } from "@holypack/core/hook/AnyHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync.cjs";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";
import type { ESLintContext } from "@holypack/integration-eslint/context/ESLintContext";
import type {
  ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC as ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC_TYPE,
} from "@holypack/integration-eslint/hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC";
import type {
  ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC as ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC_TYPE,
} from "@holypack/integration-eslint/hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC";
import type { GenerateLinterConfigArrayHookAsync } from "@holypack/integration-eslint/hooks/generate-linter-config-array/GenerateLinterConfigArrayHookAsync";
import type { GenerateLinterConfigArrayHookSync } from "@holypack/integration-eslint/hooks/generate-linter-config-array/GenerateLinterConfigArrayHookSync";
import type { ESLintIntegrationResolvedOptions } from "@holypack/integration-eslint/options/ESLintIntegrationResolvedOptions";

import type { JestIntegrationPluginESLintOptions } from "../options/JestIntegrationPluginESLintOptions";

import { JestIntegrationPluginESLintConfiguratorFacet } from "./facets/JestIntegrationPluginESLintConfiguratorFacet";
import { INTEGRATION_UID_JEST_PLUGIN_ESLINT } from "./INTEGRATION_UID_JEST_PLUGIN_ESLINT";
import type { JestIntegrationPluginESLintFacets } from "./JestIntegrationPluginESLintFacets";
import { JestIntegrationPluginESLintState } from "./JestIntegrationPluginESLintState";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export class JestIntegrationPluginESLint extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_JEST_PLUGIN_ESLINT;

  readonly facets: JestIntegrationPluginESLintFacets;

  readonly options: JestIntegrationPluginESLintOptions;

  readonly state: JestIntegrationPluginESLintState;

  constructor(
    options?: Optional<JestIntegrationPluginESLintOptions>,
  )
  {
    super();

    this.state = new JestIntegrationPluginESLintState();

    this.facets = {
      configurator: new JestIntegrationPluginESLintConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  async $initialize(
    context: ContextAsync,
  ): Promise<void>
  {
    await suppressErrorMaybeAsync(
      async () =>
      {
        const {
          ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC,
        } = await import(
          "@holypack/integration-eslint/hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC",
        );

        const {
          ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC,
        } = await import(
          "@holypack/integration-eslint/hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC",
        );

        this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC = ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC;
        this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC = ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC;
      },
    );
  }

  $initializeSync(
    context: ContextSync,
  ): void
  {
    suppressErrorSync(
      () =>
      {
        const {
          ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC,
        } = require(
          "@holypack/integration-eslint/hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC",
        ) as {
          ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC: typeof ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC_TYPE;
        };

        const {
          ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC,
        } = require(
          "@holypack/integration-eslint/hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC",
        ) as {
          ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC: typeof ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC_TYPE;
        };

        this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC = ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC;
        this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC = ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC;
      },
    );
  }

  $postBindExtensionHook(
    context: ContextAsync,
    extension: Extension,
    hook: AnyHook,
  ): void
  {
    if (
      this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC != null
      && hook.name === this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC
    )
    {
      const stage = (hook.taps.length + 1) * 1000;

      (hook as GenerateLinterConfigArrayHookAsync).tapPromise(
        {
          name: this.$uid,
          stage,
        },
        this.configureJestPluginESLint.bind(
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
    if (
      this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC != null
      && hook.name === this.state.ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC
    )
    {
      const stage = (hook.taps.length + 1) * 1000;

      (hook as GenerateLinterConfigArrayHookSync).tap(
        {
          name: this.$uid,
          stage,
        },
        this.configureJestPluginESLintSync.bind(
          this,
          context,
        ),
      );
    }
  }

  async configureJestPluginESLint(
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

  configureJestPluginESLintSync(
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
