import type { ConfigSync } from "../../config/ConfigSync";
import { findConfigFilePathSync } from "../../config/explorer/findConfigFilePathSync";
import { loadConfigDefinitionSync } from "../../config/loader/loadConfigDefinitionSync";
import { maybePatchDefined } from "../../lib/object/maybePatchDefined";
import type { Optional } from "../../lib/object/Optional";
import type { ContextSync } from "../ContextSync";

import { configureContextSync } from "./configureContextSync";
import type { ContextConfigurationByFileOptionsSync } from "./ContextConfigurationByFileOptionsSync";

export function configureContextByFileSync(
  context: ContextSync,
  options?: Optional<ContextConfigurationByFileOptionsSync>,
): ConfigSync | null
{
  options ??= {};

  const cwd = (
    options.cwd
    ?? context.cwd
  );

  const configFilePathSearchResult = findConfigFilePathSync(
    maybePatchDefined(
      {
        cwd,
      },
      maybePatchDefined(
        options.configFilePathFinderOptions,
        {
          fs: maybePatchDefined(
            context.fs,
            options.configFilePathFinderOptions?.fs,
          ),
        },
      ),
    ),
  );

  if (!configFilePathSearchResult.found)
  {
    return null;
  }

  const configDefinition = (
    configFilePathSearchResult.configDefinition
    ?? (
      loadConfigDefinitionSync(
        configFilePathSearchResult.path,
        maybePatchDefined(
          {
            cwd,
          },
          maybePatchDefined(
            options.configDefinitionLoaderOptions,
            {
              fs: maybePatchDefined(
                context.fs,
                options.configDefinitionLoaderOptions?.fs,
              ),
            },
          ),
        ),
      )
    )
  );

  return configureContextSync(
    context,
    configDefinition,
  );
}
