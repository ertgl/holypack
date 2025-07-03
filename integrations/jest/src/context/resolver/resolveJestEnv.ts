import type { JestEnv } from "../JestEnv";

export function resolveJestEnv(): JestEnv
{
  return {
    isCI: (
      process.env.CI === "1"
      || process.env.CI === "true"
    ),
  };
}
