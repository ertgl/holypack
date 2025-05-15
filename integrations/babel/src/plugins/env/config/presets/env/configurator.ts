// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  PluginItem,
  TransformOptions,
} from "@babel/core";
import type { Options as BabelPresetEnvOptions } from "@babel/preset-env";

import type { Context } from "@holypack/core";

import type { Assumptions } from "../../../../../config";
import { PACKAGE_NAME_BABEL_PRESET_ENV } from "../../../constants/packages";
import type { BabelIntegrationEnvPluginOptions } from "../../../plugin/plugin-options";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureBabelPresetEnv(
  context: Context,
  assumptions: Assumptions,
  transformOptions: TransformOptions,
  transformOptionsOverrides?: null | TransformOptions,
  envPluginOptions?: BabelIntegrationEnvPluginOptions | null,
): void
{
  envPluginOptions ??= {};

  const resolvedPackageName = require.resolve(PACKAGE_NAME_BABEL_PRESET_ENV);

  let item: null | PluginItem = null;

  if (Array.isArray(transformOptions.presets))
  {
    for (const preset of transformOptions.presets)
    {
      if (
        Array.isArray(preset)
        && (
          preset[0] === PACKAGE_NAME_BABEL_PRESET_ENV
          || preset[0] === resolvedPackageName
        )
      )
      {
        item = preset;
        break;
      }
    }
  }

  if (item != null)
  {
    return;
  }

  transformOptions.presets ??= [];

  transformOptions.presets.push(
    [
      resolvedPackageName,
      {
        ...envPluginOptions.overrides,
        modules: (
          envPluginOptions.overrides?.modules
          ?? (
            assumptions.build.target.isLegacy
              ? "commonjs"
              : false
          )
        ),
      } satisfies BabelPresetEnvOptions,
    ],
  );
}
