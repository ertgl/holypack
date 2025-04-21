import type {
  ESLintIntegrationStylisticPluginOptions,
  ESLintIntegrationStylisticPluginResolvedOptions,
} from "./plugin-options";

export function resolveESLintIntegrationStylisticPluginOptions(
  cwd: string,
  options?: boolean | ESLintIntegrationStylisticPluginOptions | null,
): ESLintIntegrationStylisticPluginResolvedOptions | false
{
  if (!options)
  {
    return false;
  }

  const optionsObject = (
    typeof options === "object"
      ? options
      : {}
  );

  const overrides = optionsObject.overrides ?? {};

  return {
    overrides: {
      ...overrides,
      arrowParens: overrides.arrowParens ?? true,
      blockSpacing: overrides.blockSpacing ?? true,
      braceStyle: overrides.braceStyle ?? "allman",
      commaDangle: overrides.commaDangle ?? "always-multiline",
      indent: overrides.indent ?? 2,
      jsx: overrides.jsx ?? false,
      quoteProps: overrides.quoteProps ?? "consistent-as-needed",
      quotes: overrides.quotes ?? "double",
      semi: overrides.semi ?? true,
    },
  };
}
