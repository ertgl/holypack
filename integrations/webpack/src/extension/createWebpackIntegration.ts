import type { Optional } from "@holypack/core/lib/object/Optional";

import type { WebpackIntegrationOptions } from "../options/WebpackIntegrationOptions";

import { WebpackIntegration } from "./WebpackIntegration";

export function createWebpackIntegration(
  options?: Optional<WebpackIntegrationOptions>,
): WebpackIntegration
{
  return new WebpackIntegration(options);
}
