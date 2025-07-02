import { CONFIG_NAMESPACE } from "./CONFIG_NAMESPACE";

export function getConfigFilePathGlobPatterns(): string[]
{
  return [
    "package.json",
    `${CONFIG_NAMESPACE}.config.ts`,
    `${CONFIG_NAMESPACE}.config.mts`,
    `${CONFIG_NAMESPACE}.config.cts`,
    `${CONFIG_NAMESPACE}.config.js`,
    `${CONFIG_NAMESPACE}.config.mjs`,
    `${CONFIG_NAMESPACE}.config.cjs`,
    `${CONFIG_NAMESPACE}.config.json`,
    `${CONFIG_NAMESPACE}.config.toml`,
    `${CONFIG_NAMESPACE}.config.{yaml,yml}`,
  ];
}
