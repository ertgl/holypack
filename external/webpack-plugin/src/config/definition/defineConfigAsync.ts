import type { Configuration } from "webpack";

import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { sealContextAsync } from "@holypack/core/context/sealer/sealContextAsync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { PatchedWithDefined } from "@holypack/core/lib/object/PatchedWithDefined";
import { resolveCWD } from "@holypack/core/lib/process/cwd/resolveCWD";
import { maybeAwait } from "@holypack/core/lib/promise/maybeAwait";
import { INTEGRATION_UID_WEBPACK } from "@holypack/integration-webpack/extension/INTEGRATION_UID_WEBPACK";
import type { WebpackIntegration } from "@holypack/integration-webpack/extension/WebpackIntegration";

import type { ConfigDefinitionProviderMaybeAsync } from "../provider/ConfigDefinitionProviderMaybeAsync";

import type { ConfigDefinitionAsync } from "./ConfigDefinitionAsync";

export async function defineConfigAsync<
  C extends ConfigDefinitionAsync = ConfigDefinitionAsync,
  F extends ConfigDefinitionProviderMaybeAsync<C> = ConfigDefinitionProviderMaybeAsync<C>,
>(
  config: F,
): Promise<Configuration>;

export async function defineConfigAsync<
  C extends ConfigDefinitionAsync = ConfigDefinitionAsync,
>(
  config: C,
): Promise<Configuration>;

export async function defineConfigAsync<
  C extends ConfigDefinitionAsync,
  F extends ConfigDefinitionProviderMaybeAsync<C>,
  I extends C | F = C | F,
  O extends Configuration = PatchedWithDefined<Configuration, C["overrides"]>,
>(
  input?: I,
): Promise<O>;

export async function defineConfigAsync<
  C extends ConfigDefinitionAsync,
  F extends ConfigDefinitionProviderMaybeAsync<C>,
  I extends C | F = C | F,
  O extends Configuration = PatchedWithDefined<Configuration, C["overrides"]>,
>(
  input?: I,
): Promise<O>
{
  const configDefinitionProvider = (
    typeof input === "function"
      ? input as F
      : undefined
  );

  let configDefinition = (
    configDefinitionProvider != null
      ? await maybeAwait(
          configDefinitionProvider({
            cwd: resolveCWD(),
          }),
        )
      : input as (C | undefined)
  );

  configDefinition ??= ({} as C);

  const context = await resolveContextAsync(configDefinition.context);

  return await sealContextAsync(
    context,
    async () =>
    {
      const integration = requireExtension<WebpackIntegration>(
        context,
        INTEGRATION_UID_WEBPACK,
      );

      return await integration.generateConfiguration(
        context,
        {
          overrides: configDefinition.overrides,
        },
      );
    },
  );
}
