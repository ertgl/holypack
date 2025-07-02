import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { MarkdownFlavor } from "../flavor/MarkdownFlavor";

export type ESLintIntegrationPluginMarkdownOptions = (
  & ExtensionFactoryOptions
  & {
    flavor?: Optional<MarkdownFlavor>;
  }
);
