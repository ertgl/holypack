import { type Configuration } from "webpack";

import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { sealContextSync } from "@holypack/core/context/sealer/sealContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { PatchedWithDefined } from "@holypack/core/lib/object/PatchedWithDefined";
import { resolveCWD } from "@holypack/core/lib/process/cwd/resolveCWD";
import { INTEGRATION_UID_WEBPACK } from "@holypack/integration-webpack/extension/INTEGRATION_UID_WEBPACK";
import type { WebpackIntegration } from "@holypack/integration-webpack/extension/WebpackIntegration";

import type { ConfigDefinitionProviderSync } from "../provider/ConfigDefinitionProviderSync";

import type { ConfigDefinitionSync } from "./ConfigDefinitionSync";

export function defineConfigSync<
  C extends ConfigDefinitionSync = ConfigDefinitionSync,
  F extends ConfigDefinitionProviderSync<C> = ConfigDefinitionProviderSync<C>,
>(
  config: F,
): Configuration;
export function defineConfigSync<
  C extends ConfigDefinitionSync = ConfigDefinitionSync,
>(
  config: C,
): Configuration;
export function defineConfigSync<
  C extends ConfigDefinitionSync,
  F extends ConfigDefinitionProviderSync<C>,
  I extends C | F = C | F,
  O extends Configuration = PatchedWithDefined<Configuration, C["overrides"]>,
>(
  input?: I,
): O;
export function defineConfigSync<
  C extends ConfigDefinitionSync,
  F extends ConfigDefinitionProviderSync<C>,
  I extends C | F = C | F,
  O extends Configuration = PatchedWithDefined<Configuration, C["overrides"]>,
>(
  input?: I,
): O
{
  const configDefinitionProvider = (
    typeof input === "function"
      ? input as F
      : undefined
  );

  let configDefinition = (
    configDefinitionProvider != null
      ? configDefinitionProvider({
          cwd: resolveCWD(),
        })
      : input as (C | undefined)
  );

  configDefinition ??= ({} as C);

  const context = resolveContextSync(configDefinition.context);

  return sealContextSync(
    context,
    () =>
    {
      const integration = requireExtension<WebpackIntegration>(
        context,
        INTEGRATION_UID_WEBPACK,
      );

      return integration.generateConfigurationSync(
        context,
        {
          overrides: configDefinition.overrides,
        },
      );
    },
  );
}
