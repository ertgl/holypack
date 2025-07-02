import type { ConfigSync } from "../../config/ConfigSync";
import type { ConfigDefinitionContext } from "../../config/context/ConfigDefinitionContext";
import type { ConfigDefinitionSync } from "../../config/definition/ConfigDefinitionSync";
import type { ConfigDefinitionProviderSync } from "../../config/provider/ConfigDefinitionProviderSync";
import { resolveConfigSync } from "../../config/resolver/resolveConfigSync";
import { bindExtensionSync } from "../../extension/binder/bindExtensionSync";
import type { ExtensionLoadingSpecSync } from "../../extension/loader/ExtensionLoadingSpecSync";
import { isExtensionLoadingSpec } from "../../extension/loader/isExtensionLoadingSpec";
import { loadExtensionBySpecSync } from "../../extension/loader/loadExtensionBySpecSync";
import { maybePatchDefined } from "../../lib/object/maybePatchDefined";
import type { Optional } from "../../lib/object/Optional";
import { absolutifyPath } from "../../lib/path/absolutifyPath";
import type { ContextSync } from "../ContextSync";

import type { ContextConfigurationOptionsSync } from "./ContextConfigurationOptionsSync";

export function configureContextSync(
  context: ContextSync,
  configDefinition: Optional<ConfigDefinitionProviderSync | ConfigDefinitionSync>,
  options?: Optional<ContextConfigurationOptionsSync>,
): ConfigSync
{
  options ??= {};

  const referrerPath = (
    options.referrerPath == null
      ? null
      : absolutifyPath(
          context.cwd,
          options.referrerPath,
        )
  );

  const configDefinitionContext: ConfigDefinitionContext = {
    cwd: context.cwd,
    referrerPath,
  };

  const config = resolveConfigSync(
    configDefinitionContext,
    configDefinition,
  );

  context.fs = maybePatchDefined(
    context.fs,
    config.fs,
  );

  for (const extensionOrLoadingSpec of config.extensions)
  {
    const extension = (
      isExtensionLoadingSpec<ExtensionLoadingSpecSync>(extensionOrLoadingSpec)
        ? loadExtensionBySpecSync(
            configDefinitionContext,
            extensionOrLoadingSpec,
          )
        : extensionOrLoadingSpec
    );

    bindExtensionSync(
      context,
      extension,
    );
  }

  return config;
}
