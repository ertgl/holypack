import type { WebpackEnv } from "../WebpackEnv";

export function resolveWebpackEnv(): WebpackEnv
{
  const envName = process.env.NODE_ENV || "development";

  const isProduction = envName === "production";
  const isDevelopment = !isProduction;

  const envMode = (
    isProduction
      ? "production"
      : "development"
  );

  return {
    isDevelopment,
    isProduction,
    mode: envMode,
    name: envName,
  };
}
