import { resolve as resolvePath } from "node:path";

import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestCacheDirectory(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  // TODO(ertgl): Standardize root directory for caches.

  config.cacheDirectory = (
    overrides?.cacheDirectory
    ?? resolvePath(preset.paths.root, ".cache", "jest")
  );
}
