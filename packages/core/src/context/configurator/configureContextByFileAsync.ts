import type { ConfigAsync } from "../../config/ConfigAsync";
import { findConfigFilePathAsync } from "../../config/explorer/findConfigFilePathAsync";
import { loadConfigDefinitionAsync } from "../../config/loader/loadConfigDefinitionAsync";
import { maybePatchDefined } from "../../lib/object/maybePatchDefined";
import type { Optional } from "../../lib/object/Optional";
import type { ContextAsync } from "../ContextAsync";

import { configureContextAsync } from "./configureContextAsync";
import type { ContextConfigurationByFileOptionsAsync } from "./ContextConfigurationByFileOptionsAsync";

export async function configureContextByFileAsync(
  context: ContextAsync,
  options?: Optional<ContextConfigurationByFileOptionsAsync>,
): Promise<ConfigAsync | null>
{
  options ??= {};

  const cwd = (
    options.cwd
    ?? context.cwd
  );

  const configFilePathSearchResult = await findConfigFilePathAsync(
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
      await loadConfigDefinitionAsync(
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

  return await configureContextAsync(
    context,
    configDefinition,
  );
}
