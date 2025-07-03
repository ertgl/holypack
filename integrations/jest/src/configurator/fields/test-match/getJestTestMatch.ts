import type { JestIntegrationResolvedOptions } from "../../../options/JestIntegrationResolvedOptions";

export function getJestTestMatch(
  options: JestIntegrationResolvedOptions,
): string[]
{
  return (
    Array.isArray(options.overrides.testMatch)
      ? options.overrides.testMatch
      : [
          "**/*.{spec,test}.{cjs,js,mjs}",
          "**/*.{spec,test}.{cjs,js,mjs}x",
          "**/*.{spec,test}.{cts,mts,ts}",
          "**/*.{spec,test}.{cts,mts,ts}x",
          "**/{spec,test}.{cjs,js,mjs}",
          "**/{spec,test}.{cjs,js,mjs}x",
          "**/{spec,test}.{cts,mts,ts}",
          "**/{spec,test}.{cts,mts,ts}x",
        ]
  );
}
