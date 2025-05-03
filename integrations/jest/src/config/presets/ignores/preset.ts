import type { Config } from "jest";

import type { Context } from "@holypack/core";

export type ConfigPresetIgnoresSettings = {
  patterns: string[];
};

export function createConfigPresetIgnoresSettings(
  context: Context,
  overrides?: Config | null,
): ConfigPresetIgnoresSettings
{
  return {
    patterns: [
      /[\\/]\.cache[\\/]/iu.source,
      /[\\/]\.yarn[\\/]/iu.source,
      /[\\/]coverage[\\/]/iu.source,
      /[\\/]dist[\\/]/iu.source,
      /[\\/]node_modules[\\/]/iu.source,
    ],
  };
}
