import type { ConfigDefinitionContext } from "../../config/context/ConfigDefinitionContext";
import { callOrReturn } from "../../lib/function/callOrReturn";
import { requireDefaultExportByPathLikeOrReturn } from "../../lib/module/requireDefaultExportByPathLikeOrReturn";
import { requireWithReferrer } from "../../lib/module/requireWithReferrer";
import type { Optional } from "../../lib/object/Optional";
import { maybePathLikeToPath } from "../../lib/path/maybePathLikeToPath";
import type { PathLike } from "../../lib/path/PathLike";
import type { Extension } from "../Extension";
import type { ExtensionFactoryOptions } from "../factory/ExtensionFactoryOptions";
import type { ExtensionFactorySync } from "../factory/ExtensionFactorySync";

import type { ExtensionLoadingSpecSync } from "./ExtensionLoadingSpecSync";

export function loadExtensionBySpecSync<
  T_Extension extends Extension = Extension,
>(
  configDefinitionContext: ConfigDefinitionContext,
  spec: ExtensionLoadingSpecSync,
): T_Extension
{
  let specOrExtension = spec as ExtensionLoadingSpecSync | T_Extension;

  specOrExtension = maybePathLikeToPath(specOrExtension);

  if (typeof specOrExtension === "string")
  {
    specOrExtension = requireDefaultExportByPathLikeOrReturn<
      typeof specOrExtension,
      Exclude<typeof specOrExtension, string>
    >(
      requireWithReferrer.bind(
        null,
        configDefinitionContext.cwd,
        configDefinitionContext.referrerPath,
      ) as NodeJS.Require,
      specOrExtension,
    );
  }

  if (typeof specOrExtension === "function")
  {
    specOrExtension = callOrReturn(specOrExtension);
  }

  if (Array.isArray(specOrExtension))
  {
    const options = specOrExtension[1] as Optional<ExtensionFactoryOptions>;
    specOrExtension = specOrExtension[0] as ExtensionFactorySync<T_Extension> | PathLike;

    if (typeof specOrExtension === "string")
    {
      specOrExtension = requireDefaultExportByPathLikeOrReturn<
        typeof specOrExtension,
        Exclude<typeof specOrExtension, string>
      >(
        requireWithReferrer.bind(
          null,
          configDefinitionContext.cwd,
          configDefinitionContext.referrerPath,
        ) as NodeJS.Require,
        specOrExtension,
      );
    }

    if (typeof specOrExtension === "function")
    {
      specOrExtension = callOrReturn(
        specOrExtension,
        options,
      );
    }
  }

  return specOrExtension as T_Extension;
}
