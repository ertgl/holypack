import { CONFIG_NAMESPACE } from "../namespace";

export function getDefaultConfigSearchPlaces(
  namespace?: null | string,
): string[]
{
  namespace ??= CONFIG_NAMESPACE;

  return [
    "package.json",
    `${namespace}.config.ts`,
    `${namespace}.config.js`,
    `${namespace}.config.mts`,
    `${namespace}.config.mjs`,
    `${namespace}.config.cts`,
    `${namespace}.config.cjs`,
    `.${namespace}rc.ts`,
    `.${namespace}rc.js`,
    `.${namespace}rc.mts`,
    `.${namespace}rc.mjs`,
    `.${namespace}rc.cts`,
    `.${namespace}rc.cjs`,
    `.${namespace}rc.json`,
    `.${namespace}rc.yml`,
    `.${namespace}rc.yaml`,
    `.${namespace}rc`,
    `.config/${namespace}rc.ts`,
    `.config/${namespace}rc.js`,
    `.config/${namespace}rc.mts`,
    `.config/${namespace}rc.mjs`,
    `.config/${namespace}rc.cts`,
    `.config/${namespace}rc.cjs`,
    `.config/${namespace}rc.json`,
    `.config/${namespace}rc.yml`,
    `.config/${namespace}rc.yaml`,
    `.config/${namespace}rc`,
  ];
}
