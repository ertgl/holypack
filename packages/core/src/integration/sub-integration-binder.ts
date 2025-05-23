import type { StrictConfig } from "../config";
import type { StrictContext } from "../context";
import { maybeAwait } from "../lib/promise";

import type { Integration } from "./integration";
import { bindIntegration } from "./integration-binder";
import type { IntegrationBinderOptions } from "./integration-binder-options";

export async function bindSubIntegration(
  context: StrictContext,
  config: StrictConfig,
  integration: Integration,
  options?: IntegrationBinderOptions | null,
): Promise<void>
{
  bindIntegration(context, integration, options);

  if (integration.setup != null)
  {
    await maybeAwait(integration.setup(context, config));
  }
}
