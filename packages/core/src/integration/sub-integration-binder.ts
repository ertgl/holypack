import type { Config } from "../config";
import type { Context } from "../context";
import { maybeAwait } from "../utils/promise";

import type { Integration } from "./integration";
import { bindIntegration } from "./integration-binder";
import type { IntegrationBinderOptions } from "./integration-binder-options";

export async function bindSubIntegration(
  context: Context,
  config: Config,
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
