import type { TransformOptions } from "@babel/core";

import type { Program } from "@holypack/cli/program/Program.cjs";
import type { CLIExtensionProtocol } from "@holypack/cli/protocol/CLIExtensionProtocol";
import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import { maybeBindExtensionAsync } from "@holypack/core/extension/binder/maybeBindExtensionAsync";
import { maybeBindExtensionSync } from "@holypack/core/extension/binder/maybeBindExtensionSync";
import { maybeBindExtensionHookAsync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";

import { createCLICommandBabel } from "../cli/createCLICommandBabel";
import type { BabelConfiguratorOptions } from "../configurator/options/BabelConfiguratorOptions";
import { createGenerateTransformOptionsHookAsync } from "../hooks/generate-transform-options/createGenerateTransformOptionsHookAsync";
import { createGenerateTransformOptionsHookSync } from "../hooks/generate-transform-options/createGenerateTransformOptionsHookSync";
import { createBabelIntegrationPluginImportSourceTransformer } from "../plugins/transform-import-source/extension/createBabelIntegrationPluginImportSourceTransformer";
import { createBabelIntegrationPresetEnv } from "../presets/env/extension/createBabelIntegrationPresetEnv";
import { createBabelIntegrationPresetTypeScript } from "../presets/typescript/extension/createBabelIntegrationPresetTypeScript";
import type { BabelConfigFilePathFinderOptionsAsync } from "../utils/config-file-path-finder/BabelConfigFilePathFinderOptionsAsync";
import type { BabelConfigFilePathFinderOptionsSync } from "../utils/config-file-path-finder/BabelConfigFilePathFinderOptionsSync";

import type { BabelIntegrationFacets } from "./BabelIntegrationFacets";
import { BabelConfigFilePathFinderFacet } from "./facets/BabelConfigFilePathFinderFacet";
import { BabelConfiguratorFacet } from "./facets/BabelConfiguratorFacet";
import { INTEGRATION_UID_BABEL } from "./INTEGRATION_UID_BABEL";
import type { BabelIntegrationOptions } from "./options/BabelIntegrationOptions";

export class BabelIntegration extends AbstractExtension
  implements CLIExtensionProtocol
{
  readonly $uid = INTEGRATION_UID_BABEL;

  readonly facets: BabelIntegrationFacets;

  readonly options: BabelIntegrationOptions;

  constructor(
    options?: Optional<BabelIntegrationOptions>,
  )
  {
    super();

    this.facets = {
      configFileFinder: new BabelConfigFilePathFinderFacet(),
      configurator: new BabelConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  async $augmentContext(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionAsync(
      context,
      createBabelIntegrationPluginImportSourceTransformer(),
    );

    await maybeBindExtensionAsync(
      context,
      createBabelIntegrationPresetEnv(),
    );

    await maybeBindExtensionAsync(
      context,
      createBabelIntegrationPresetTypeScript(),
    );
  }

  $augmentContextSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionSync(
      context,
      createBabelIntegrationPluginImportSourceTransformer(),
    );

    maybeBindExtensionSync(
      context,
      createBabelIntegrationPresetEnv(),
    );

    maybeBindExtensionSync(
      context,
      createBabelIntegrationPresetTypeScript(),
    );
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createGenerateTransformOptionsHookAsync(),
    );
  }

  $setupCLI(
    context: ContextAsync,
    program: Program,
  ): void
  {
    program.addCommand(
      createCLICommandBabel(
        context,
        program,
      ),
    );
  }

  $setupCLISync(
    context: ContextSync,
    program: Program,
  ): void
  {
    program.addCommand(
      createCLICommandBabel(
        context,
        program,
      ),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createGenerateTransformOptionsHookSync(),
    );
  }

  async findConfigFilePath(
    context: ContextAsync,
    options?: Optional<BabelConfigFilePathFinderOptionsAsync>,
  ): Promise<null | Path>
  {
    return await this.facets.configFileFinder.find(
      context,
      options,
    );
  }

  findConfigFilePathSync(
    context: ContextSync,
    options?: Optional<BabelConfigFilePathFinderOptionsSync>,
  ): null | Path
  {
    return this.facets.configFileFinder.findSync(
      context,
      options,
    );
  }

  async generateTransformOptions(
    context: ContextAsync,
    options?: Optional<BabelConfiguratorOptions>,
  ): Promise<TransformOptions>
  {
    return await this.facets.configurator.generateTransformOptions(
      context,
      options,
    );
  }

  generateTransformOptionsSync(
    context: ContextSync,
    options?: Optional<BabelConfiguratorOptions>,
  ): TransformOptions
  {
    return this.facets.configurator.generateTransformOptionsSync(
      context,
      options,
    );
  }
}
