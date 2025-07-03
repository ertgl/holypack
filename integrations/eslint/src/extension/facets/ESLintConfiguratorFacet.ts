import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { useExtensionHookAsync } from "@holypack/core/extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "@holypack/core/extension/hook/interop/useExtensionHookSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { generateLinterConfigArray } from "../../configurator/generateLinterConfigArray";
import { resolveESLintContextAsync } from "../../context/resolver/resolveESLintContextAsync";
import { resolveESLintContextSync } from "../../context/resolver/resolveESLintContextSync";
import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC } from "../../hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC";
import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC } from "../../hooks/generate-linter-config-array/ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC";
import type { GenerateLinterConfigArrayHookAsync } from "../../hooks/generate-linter-config-array/GenerateLinterConfigArrayHookAsync";
import type { GenerateLinterConfigArrayHookSync } from "../../hooks/generate-linter-config-array/GenerateLinterConfigArrayHookSync";
import { resolveESLintIntegrationOptions } from "../../options/resolveESLintIntegrationOptions";
import type { ESLintIntegration } from "../ESLintIntegration";
import { INTEGRATION_UID_ESLINT } from "../INTEGRATION_UID_ESLINT";

export class ESLintConfiguratorFacet
{
  async generateLinterConfigArray(
    context: ContextAsync,
  ): Promise<Linter.Config[]>
  {
    const eslintIntegration = requireExtension<ESLintIntegration>(
      context,
      INTEGRATION_UID_ESLINT,
    );

    const options = resolveESLintIntegrationOptions(eslintIntegration.options);

    const eslintContext = await resolveESLintContextAsync(
      context,
      options,
    );

    const linterConfigArray = generateLinterConfigArray(
      eslintContext,
      options,
    );

    await useExtensionHookAsync(
      eslintIntegration,
      ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC,
      async (
        generateTransformOptionsHook: GenerateLinterConfigArrayHookAsync,
      ) =>
      {
        await generateTransformOptionsHook.promise(
          eslintContext,
          options,
          linterConfigArray,
        );
      },
    );

    return linterConfigArray;
  }

  generateLinterConfigArraySync(
    context: ContextSync,
  ): Linter.Config[]
  {
    const eslintIntegration = requireExtension<ESLintIntegration>(
      context,
      INTEGRATION_UID_ESLINT,
    );

    const options = resolveESLintIntegrationOptions(eslintIntegration.options);

    const eslintContext = resolveESLintContextSync(
      context,
      options,
    );

    const linterConfigArray = generateLinterConfigArray(
      eslintContext,
      options,
    );

    useExtensionHookSync(
      eslintIntegration,
      ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC,
      (
        generateTransformOptionsHook: GenerateLinterConfigArrayHookSync,
      ) =>
      {
        generateTransformOptionsHook.call(
          eslintContext,
          options,
          linterConfigArray,
        );
      },
    );

    return linterConfigArray;
  }
}
