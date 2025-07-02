// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type { Linter } from "eslint";
import type Globals from "globals";

import { requireDefaultExport } from "@holypack/core/lib/module/requireDefaultExport";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import { evaluateLinterConfigPredicates } from "../../../config/evaluateLinterConfigPredicates";
import { GLOB_PATTERN_CJS_CJSX_CTS_CTSX } from "../../../config/glob-patterns/GLOB_PATTERN_CJS_CJSX_CTS_CTSX";
import { GLOB_PATTERN_JS_JSX_TS_TSX } from "../../../config/glob-patterns/GLOB_PATTERN_JS_JSX_TS_TSX";
import { GLOB_PATTERN_MJS_MJSX_MTS_MTSX } from "../../../config/glob-patterns/GLOB_PATTERN_MJS_MJSX_MTS_MTSX";
import type { ESLintContext } from "../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../options/ESLintIntegrationResolvedOptions";
import { LINTER_CONFIG_NAME_GLOBALS_CJS_CJSX_CTS_CTSX } from "../config/names/cjs-cjsx-cts-ctsx/LINTER_CONFIG_NAME_GLOBALS_CJS_CJSX_CTS_CTSX";
import { LINTER_CONFIG_NAME_GLOBALS_JS_JSX_TS_TSX } from "../config/names/js-jsx-ts-tsx/LINTER_CONFIG_NAME_GLOBALS_JS_JSX_TS_TSX";
import { LINTER_CONFIG_NAME_GLOBALS_MJS_MJSX_MTS_MTSX } from "../config/names/mjs-mjsx-mts-mtsx/LINTER_CONFIG_NAME_GLOBALS_MJS_MJSX_MTS_MTSX";
import { PACKAGE_NAME_GLOBALS } from "../module/PACKAGE_NAME_GLOBALS";
import type { ESLintIntegrationPluginGlobalsResolvedOptions } from "../options/ESLintIntegrationPluginGlobalsResolvedOptions";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function configureESLintPluginGlobalsSync(
  eslintContext: ESLintContext,
  eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
  eslintIntegrationPluginOptions: ESLintIntegrationPluginGlobalsResolvedOptions,
  linterConfigArray: Linter.Config[],
): void
{
  const {
    [LINTER_CONFIG_NAME_GLOBALS_CJS_CJSX_CTS_CTSX]: cjsCjsxCtsCtsxConfigIndexes,
    [LINTER_CONFIG_NAME_GLOBALS_JS_JSX_TS_TSX]: jsJsxTsTsxConfigIndexes,
    [LINTER_CONFIG_NAME_GLOBALS_MJS_MJSX_MTS_MTSX]: mjsMjsxMtsMtsxConfigIndexes,
  } = evaluateLinterConfigPredicates(
    linterConfigArray,
    {
      [LINTER_CONFIG_NAME_GLOBALS_CJS_CJSX_CTS_CTSX]: LINTER_CONFIG_NAME_GLOBALS_CJS_CJSX_CTS_CTSX,
      [LINTER_CONFIG_NAME_GLOBALS_JS_JSX_TS_TSX]: LINTER_CONFIG_NAME_GLOBALS_JS_JSX_TS_TSX,
      [LINTER_CONFIG_NAME_GLOBALS_MJS_MJSX_MTS_MTSX]: LINTER_CONFIG_NAME_GLOBALS_MJS_MJSX_MTS_MTSX,
    },
  );

  const cjsCjsxCtsCtsxConfigExists = cjsCjsxCtsCtsxConfigIndexes.size > 0;
  const mjsMjsxMtsMtsxConfigExists = mjsMjsxMtsMtsxConfigIndexes.size > 0;
  const jsJsxTsTsxConfigExists = jsJsxTsTsxConfigIndexes.size > 0;

  if (
    cjsCjsxCtsCtsxConfigExists
    && mjsMjsxMtsMtsxConfigExists
    && jsJsxTsTsxConfigExists
  )
  {
    return;
  }

  const globals = suppressErrorSync(
    requireDefaultExport<typeof Globals>,
    require,
    PACKAGE_NAME_GLOBALS,
  );

  if (globals == null)
  {
    return;
  }

  if (!cjsCjsxCtsCtsxConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
      ],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.commonjs,
          ...globals.node,
          ...globals.nodeBuiltin,
        },
      },
      name: LINTER_CONFIG_NAME_GLOBALS_CJS_CJSX_CTS_CTSX,
    });
  }

  if (!jsJsxTsTsxConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_JS_JSX_TS_TSX,
      ],
      languageOptions: {
        // TODO(ertgl): Treat these files as isomorphic and assume they will be processed by a bundler. Support specifying build target (server/browser/isomorphic) per workspace and override the globals accordingly.
        globals: {
          ...globals.browser,
          ...globals.builtin,
          ...globals.commonjs,
          ...globals.es2025,
          ...globals.node,
          ...globals.nodeBuiltin,
        },
      },
      name: LINTER_CONFIG_NAME_GLOBALS_JS_JSX_TS_TSX,
    });
  }

  if (!mjsMjsxMtsMtsxConfigExists)
  {
    linterConfigArray.push({
      files: [
        GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
      ],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.es2025,
          ...globals.node,
          ...globals.nodeBuiltin,
        },
      },
      name: LINTER_CONFIG_NAME_GLOBALS_MJS_MJSX_MTS_MTSX,
    });
  }
}
