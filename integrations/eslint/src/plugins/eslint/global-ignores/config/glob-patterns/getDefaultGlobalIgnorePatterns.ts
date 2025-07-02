export function getDefaultGlobalIgnorePatterns(): string[]
{
  return Array.from(
    new Set([
      "**/.coverage/",
      "**/.git/",
      "**/.holypack/",
      "**/.yarn/",
      "**/dist/",
      "**/node_modules/",
      "**/package.json.state",
      "**/yarn.lock",
    ]),
  );
}
