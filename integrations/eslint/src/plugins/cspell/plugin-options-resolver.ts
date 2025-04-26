import { resolve as resolvePath } from "node:path";

import { resolveCWD } from "@holypack/core/utils/process/cwd";

import type {
  ESLintIntegrationCSpellPluginOptions,
  ESLintIntegrationCSpellPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationCSpellPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationCSpellPluginOptions | null,
): ESLintIntegrationCSpellPluginResolvedOptions | false
{
  if (options === false)
  {
    return false;
  }

  const optionsObject = (
    options === true
      ? {}
      : options ?? {}
  );

  const overrides = optionsObject.overrides ?? {};

  const finalCWD = resolveCWD(
    overrides.cspellOptionsRoot
    ?? cwd,
  );

  return {
    overrides: {
      ...overrides,
      autoFix: overrides.autoFix ?? false,
      checkComments: overrides.checkComments ?? true,
      checkIdentifiers: overrides.checkIdentifiers ?? true,
      checkJSXText: overrides.checkJSXText ?? true,
      checkStrings: overrides.checkStrings ?? true,
      checkStringTemplates: overrides.checkStringTemplates ?? true,
      configFile: (
        overrides.configFile
        ?? resolvePath(
          finalCWD,
          "cspell.config.yaml",
        )
      ),
      cspellOptionsRoot: finalCWD,
      generateSuggestions: overrides.generateSuggestions ?? true,
      ignoreImportProperties: overrides.ignoreImportProperties ?? false,
      ignoreImports: overrides.ignoreImports ?? false,
      numSuggestions: overrides.numSuggestions ?? 1,
    },
  };
}
