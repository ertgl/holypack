import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { BabelContext } from "../../../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../../../options/BabelIntegrationResolvedOptions";
import { configureBabelPluginImportSourceTransformer } from "../../configurator/configureBabelPluginImportSourceTransformer";
import { resolveBabelIntegrationPluginImportSourceTransformerOptions } from "../../options/resolveBabelIntegrationPluginImportSourceTransformerOptions";
import type { BabelIntegrationPluginImportSourceTransformer } from "../BabelIntegrationPluginImportSourceTransformer";
import { INTEGRATION_UID_BABEL_PLUGIN_IMPORT_SOURCE_TRANSFORMER } from "../INTEGRATION_UID_BABEL_PLUGIN_IMPORT_SOURCE_TRANSFORMER";

export class BabelPluginImportSourceTransformerConfiguratorFacet
{
  // eslint-disable-next-line @typescript-eslint/require-await
  async configureBabelPluginImportSourceTransformer(
    context: ContextAsync,
    babelContext: BabelContext,
    options: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    const babelIntegrationPluginImportSourceTransformer = requireExtension<BabelIntegrationPluginImportSourceTransformer>(
      context,
      INTEGRATION_UID_BABEL_PLUGIN_IMPORT_SOURCE_TRANSFORMER,
    );

    const pluginImportSourceTransformerOptions = resolveBabelIntegrationPluginImportSourceTransformerOptions(
      babelIntegrationPluginImportSourceTransformer.options,
    );

    configureBabelPluginImportSourceTransformer(
      babelContext,
      options,
      pluginImportSourceTransformerOptions,
      transformOptions,
    );
  }

  configureBabelPluginImportSourceTransformerSync(
    context: ContextSync,
    babelContext: BabelContext,
    options: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ): void
  {
    const babelIntegrationPluginImportSourceTransformer = requireExtension<BabelIntegrationPluginImportSourceTransformer>(
      context,
      INTEGRATION_UID_BABEL_PLUGIN_IMPORT_SOURCE_TRANSFORMER,
    );

    const pluginImportSourceTransformerOptions = resolveBabelIntegrationPluginImportSourceTransformerOptions(
      babelIntegrationPluginImportSourceTransformer.options,
    );

    configureBabelPluginImportSourceTransformer(
      babelContext,
      options,
      pluginImportSourceTransformerOptions,
      transformOptions,
    );
  }
}
