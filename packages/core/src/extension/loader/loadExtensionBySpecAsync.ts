import type { ConfigDefinitionContext } from "../../config/context/ConfigDefinitionContext";
import { callOrReturn } from "../../lib/function/callOrReturn";
import { importDefaultExportByPathLikeOrReturn } from "../../lib/module/importDefaultExportByPathLikeOrReturn";
import type { ImportFunction } from "../../lib/module/ImportFunction";
import { importWithReferrer } from "../../lib/module/importWithReferrer";
import type { Optional } from "../../lib/object/Optional";
import { maybePathLikeToPath } from "../../lib/path/maybePathLikeToPath";
import type { PathLike } from "../../lib/path/PathLike";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { Extension } from "../Extension";
import type { ExtensionFactoryMaybeAsync } from "../factory/ExtensionFactoryMaybeAsync";
import type { ExtensionFactoryOptions } from "../factory/ExtensionFactoryOptions";

import type { ExtensionLoadingSpecAsync } from "./ExtensionLoadingSpecAsync";

export async function loadExtensionBySpecAsync<
  T_Extension extends Extension = Extension,
>(
  configDefinitionContext: ConfigDefinitionContext,
  spec: ExtensionLoadingSpecAsync,
): Promise<T_Extension>
{
  let specOrExtension = spec as ExtensionLoadingSpecAsync | T_Extension;

  specOrExtension = maybePathLikeToPath(specOrExtension);

  if (typeof specOrExtension === "string")
  {
    specOrExtension = await importDefaultExportByPathLikeOrReturn<
      typeof specOrExtension,
      Exclude<typeof specOrExtension, string>
    >(
      importWithReferrer.bind(
        null,
        configDefinitionContext.cwd,
        configDefinitionContext.referrerPath,
      ) as ImportFunction<Exclude<typeof specOrExtension, string>>,
      specOrExtension,
    );
  }

  if (typeof specOrExtension === "function")
  {
    specOrExtension = await maybeAwait(
      callOrReturn(
        specOrExtension,
      ),
    );
  }

  if (Array.isArray(specOrExtension))
  {
    const options = specOrExtension[1] as Optional<ExtensionFactoryOptions>;
    specOrExtension = specOrExtension[0] as ExtensionFactoryMaybeAsync<T_Extension> | PathLike;

    if (typeof specOrExtension === "string")
    {
      specOrExtension = await importDefaultExportByPathLikeOrReturn<
        typeof specOrExtension,
        Exclude<typeof specOrExtension, string>
      >(
        importWithReferrer.bind(
          null,
          configDefinitionContext.cwd,
          configDefinitionContext.referrerPath,
        ) as ImportFunction<Exclude<typeof specOrExtension, string>>,
        specOrExtension,
      );
    }

    if (typeof specOrExtension === "function")
    {
      specOrExtension = await maybeAwait(
        callOrReturn(
          specOrExtension,
          options,
        ),
      );
    }
  }

  return specOrExtension as T_Extension;
}
