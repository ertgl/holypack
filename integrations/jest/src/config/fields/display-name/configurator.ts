import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestDisplayName(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  // TODO(ertgl): Determine the current workspace for the `displayName` option of the Jest config.

  config.displayName = (
    overrides?.displayName
    ?? context.project.name
  );
}
