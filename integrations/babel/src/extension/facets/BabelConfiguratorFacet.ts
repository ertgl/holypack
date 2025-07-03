import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { useExtensionHookAsync } from "@holypack/core/extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "@holypack/core/extension/hook/interop/useExtensionHookSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { generateBabelTransformOptions } from "../../configurator/generateBabelTransformOptions";
import { resolveBabelContext } from "../../context/resolver/resolveBabelContext";
import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC } from "../../hooks/generate-transform-options/BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC";
import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC } from "../../hooks/generate-transform-options/BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC";
import type { GenerateTransformOptionsHookAsync } from "../../hooks/generate-transform-options/GenerateTransformOptionsHookAsync";
import type { GenerateTransformOptionsHookSync } from "../../hooks/generate-transform-options/GenerateTransformOptionsHookSync";
import { resolveBabelIntegrationOptions } from "../../options/resolveBabelIntegrationOptions";
import type { BabelIntegration } from "../BabelIntegration";
import { INTEGRATION_UID_BABEL } from "../INTEGRATION_UID_BABEL";

export class BabelConfiguratorFacet
{
  async generateTransformOptions(
    context: ContextAsync,
  ): Promise<TransformOptions>
  {
    const babelIntegration = requireExtension<BabelIntegration>(
      context,
      INTEGRATION_UID_BABEL,
    );

    const options = resolveBabelIntegrationOptions(babelIntegration.options);
    const babelContext = resolveBabelContext(options);

    const transformOptions = generateBabelTransformOptions(
      babelContext,
      options,
    );

    await useExtensionHookAsync(
      babelIntegration,
      BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC,
      async (
        generateTransformOptionsHook: GenerateTransformOptionsHookAsync,
      ) =>
      {
        await generateTransformOptionsHook.promise(
          babelContext,
          options,
          transformOptions,
        );
      },
    );

    return transformOptions;
  }

  generateTransformOptionsSync(
    context: ContextSync,
  ): TransformOptions
  {
    const babelIntegration = requireExtension<BabelIntegration>(
      context,
      INTEGRATION_UID_BABEL,
    );

    const options = resolveBabelIntegrationOptions(babelIntegration.options);
    const babelContext = resolveBabelContext(options);

    const transformOptions = generateBabelTransformOptions(
      babelContext,
      options,
    );

    useExtensionHookSync(
      babelIntegration,
      BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC,
      (
        generateTransformOptionsHook: GenerateTransformOptionsHookSync,
      ) =>
      {
        generateTransformOptionsHook.call(
          babelContext,
          options,
          transformOptions,
        );
      },
    );

    return transformOptions;
  }
}
