import { resolve as resolvePath } from "node:path";

import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../config/presets";

export function configureWebpackEntry(
  context: Context,
  config: Configuration,
  preset: ConfigPreset,
  overrides?: Configuration | null,
): void
{
  config.entry = (
    overrides?.entry
    ?? {
      main: {
        import: resolvePath(preset.paths.src, "main.js"),
      },
    }
  );
}
