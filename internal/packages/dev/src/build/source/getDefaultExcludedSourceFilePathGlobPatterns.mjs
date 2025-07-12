/**
 * @returns {string[]}
 */
export function getDefaultExcludedSourceFilePathGlobPatterns()
{
  return [
    "**/__fixtures__/",
    "**/__tests__/",
    "**/*.d.ts",
  ];
}
