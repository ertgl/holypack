import type {
  Context,
  ContextResolutionOptions,
  Integration,
} from "@holypack/core";

import type { TypeScriptIntegrationOptions } from "./integration-options";

export const INTEGRATION_NAME_TYPESCRIPT = "@holypack/integration:TypeScript";

export class TypeScriptIntegration implements Integration
{
  name = INTEGRATION_NAME_TYPESCRIPT;

  options: TypeScriptIntegrationOptions;

  constructor(
    options?: null | TypeScriptIntegrationOptions,
  )
  {
    this.options = options ?? {};
  }

  resolveContext(
    context: Context,
    options: ContextResolutionOptions,
  ): void
  {
    // TODO(ertgl): Resolve TypeScript related context.
    context.typescript = {};
  }
}

export function createTypeScriptIntegration(
  options?: null | TypeScriptIntegrationOptions,
): TypeScriptIntegration
{
  return new TypeScriptIntegration(options);
}
