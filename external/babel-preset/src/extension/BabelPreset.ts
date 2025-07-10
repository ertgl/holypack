import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import { maybeBindExtensionAsync } from "@holypack/core/extension/binder/maybeBindExtensionAsync";
import { maybeBindExtensionSync } from "@holypack/core/extension/binder/maybeBindExtensionSync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { createBabelIntegration } from "@holypack/integration-babel/extension/createBabelIntegration";

import { EXTENSION_UID_BABEL_PRESET } from "./EXTENSION_UID_BABEL_PRESET";
import type { BabelPresetOptions } from "./options/BabelPresetOptions";

export class BabelPreset extends AbstractExtension
{
  readonly $uid = EXTENSION_UID_BABEL_PRESET;

  readonly options: BabelPresetOptions;

  constructor(
    options?: Optional<BabelPresetOptions>,
  )
  {
    super();

    this.options = options ?? {};
  }

  async $augmentContext(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionAsync(
      context,
      createBabelIntegration(),
    );
  }

  $augmentContextSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionSync(
      context,
      createBabelIntegration(),
    );
  }
}
