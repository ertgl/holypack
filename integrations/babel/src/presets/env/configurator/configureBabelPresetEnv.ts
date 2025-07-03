// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type {
  PluginItem,
  TransformOptions,
} from "@babel/core";
import type { Options as BabelPresetEnvOptions } from "@babel/preset-env";

import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import { MODULE_FORMAT_CJS } from "../../../compilation/MODULE_FORMAT_CJS";
import type { BabelContext } from "../../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../../options/BabelIntegrationResolvedOptions";
import { PACKAGE_NAME_BABEL_PRESET_ENV } from "../constants/PACKAGE_NAME_BABEL_PRESET_ENV";
import type { BabelIntegrationPresetEnvResolvedOptions } from "../options/BabelIntegrationPresetEnvResolvedOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureBabelPresetEnv(
  babelContext: BabelContext,
  options: BabelIntegrationResolvedOptions,
  presetEnvOptions: BabelIntegrationPresetEnvResolvedOptions,
  transformOptions: TransformOptions,
): void
{
  const resolvedPackageName = suppressErrorSync(
    require.resolve.bind(require),
    PACKAGE_NAME_BABEL_PRESET_ENV,
  );

  if (!resolvedPackageName)
  {
    return;
  }

  let item: null | PluginItem = null;

  if (Array.isArray(transformOptions.presets))
  {
    for (const preset of transformOptions.presets)
    {
      if (
        (
          typeof preset === "string"
          && (
            preset === PACKAGE_NAME_BABEL_PRESET_ENV
            || preset === resolvedPackageName
          )
        )
        || (
          Array.isArray(preset)
          && (
            preset[0] === PACKAGE_NAME_BABEL_PRESET_ENV
            || preset[0] === resolvedPackageName
          )
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
        exclude: [
          "@babel/plugin-transform-regenerator",
        ],
        ...presetEnvOptions.overrides,
        modules: (
          presetEnvOptions.overrides.modules
          ?? (
            babelContext.build.target.format === MODULE_FORMAT_CJS
              ? "commonjs"
              : false
          )
        ),
      } satisfies BabelPresetEnvOptions,
    ],
  );
}
