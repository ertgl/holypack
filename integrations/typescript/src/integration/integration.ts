import type {
  ContextResolutionOptions,
  Integration,
  TypeSafeContext,
} from "@holypack/core";

import { TypeScriptIntegrationAPI } from "./integration-api";
import type { TypeScriptIntegrationOptions } from "./integration-options";

export const INTEGRATION_NAME_TYPESCRIPT = "@holypack/integration:TypeScript";

export class TypeScriptIntegration implements Integration
{
  api: TypeScriptIntegrationAPI;

  name = INTEGRATION_NAME_TYPESCRIPT;

  options: TypeScriptIntegrationOptions;

  constructor(
    options?: null | TypeScriptIntegrationOptions,
  )
  {
    this.api = new TypeScriptIntegrationAPI(this);
    this.options = options ?? {};
  }

  async resolveContext(
    context: TypeSafeContext,
    options: ContextResolutionOptions,
  ): Promise<void>
  {
    const tsconfigRootDirectoryPath = (
      this.options.tsconfigRootDirectoryPath
      ?? await this.api.findTSConfigRootDirectoryPath(context)
    );

    context.typescript = {
      tsconfigRootDirectoryPath,
    };
  }
}

export function createTypeScriptIntegration(
  options?: null | TypeScriptIntegrationOptions,
): TypeScriptIntegration
{
  return new TypeScriptIntegration(options);
}
