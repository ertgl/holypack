import type { ConfigAsync } from "../../config/ConfigAsync";
import type { ConfigDefinitionContext } from "../../config/context/ConfigDefinitionContext";
import type { ConfigDefinitionAsync } from "../../config/definition/ConfigDefinitionAsync";
import type { ConfigDefinitionProviderMaybeAsync } from "../../config/provider/ConfigDefinitionProviderMaybeAsync";
import { resolveConfigAsync } from "../../config/resolver/resolveConfigAsync";
import { bindExtensionAsync } from "../../extension/binder/bindExtensionAsync";
import type { ExtensionLoadingSpecAsync } from "../../extension/loader/ExtensionLoadingSpecAsync";
import { isExtensionLoadingSpec } from "../../extension/loader/isExtensionLoadingSpec";
import { loadExtensionBySpecAsync } from "../../extension/loader/loadExtensionBySpecAsync";
import { maybePatchDefined } from "../../lib/object/maybePatchDefined";
import type { Optional } from "../../lib/object/Optional";
import { absolutifyPath } from "../../lib/path/absolutifyPath";
import type { ContextAsync } from "../ContextAsync";

import type { ContextConfigurationOptionsAsync } from "./ContextConfigurationOptionsAsync";

export async function configureContextAsync(
  context: ContextAsync,
  configDefinition: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>,
  options?: Optional<ContextConfigurationOptionsAsync>,
): Promise<ConfigAsync>
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

  const config = await resolveConfigAsync(
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
      isExtensionLoadingSpec<ExtensionLoadingSpecAsync>(extensionOrLoadingSpec)
        ? await loadExtensionBySpecAsync(
            configDefinitionContext,
            extensionOrLoadingSpec,
          )
        : extensionOrLoadingSpec
    );

    await bindExtensionAsync(
      context,
      extension,
    );
  }

  return config;
}
