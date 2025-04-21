import type { Integration } from "../integration";

export const ERROR_INTEGRATION_IS_ALREADY_BOUND = "IntegrationIsAlreadyBoundError";

export class IntegrationIsAlreadyBoundError extends Error
{
  integration: Integration;

  constructor(
    integration: Integration,
  )
  {
    super(`Integration is already bound: ${integration.name}`);
    this.name = ERROR_INTEGRATION_IS_ALREADY_BOUND;
    this.integration = integration;
  }
}
