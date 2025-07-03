import type { BabelEnv } from "../BabelEnv";

export function resolveBabelEnv(): BabelEnv
{
  return {
    isTest: process.env.NODE_ENV === "test",
  };
}
