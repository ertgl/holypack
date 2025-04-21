import type { Integration } from "../integration";

export const ERROR_INTEGRATION_NAME_IS_NOT_DEFINED = "IntegrationNameIsNotDefinedError";

export class IntegrationNameIsNotDefinedError extends Error
{
  integration: Integration;

  constructor(
    integration: Integration,
  )
  {
    super(`Integration name is not defined: ${integration.constructor.name}`);
    this.name = ERROR_INTEGRATION_NAME_IS_NOT_DEFINED;
    this.integration = integration;
  }
}
