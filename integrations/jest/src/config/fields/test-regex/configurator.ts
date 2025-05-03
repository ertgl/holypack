import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestTestRegex(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.testRegex = (
    overrides?.testRegex
    ?? [
      /(?:.+\.)?(?:spec|test)\.[cm]?[jt]s[x]?/iu.source,
    ]
  );
}
