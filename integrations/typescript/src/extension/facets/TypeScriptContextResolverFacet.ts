import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";

import { resolveTypeScriptContextAsync } from "../../context/resolver/resolveTypeScriptContextAsync";
import { resolveTypeScriptContextSync } from "../../context/resolver/resolveTypeScriptContextSync";
import type { TypeScriptContext } from "../../context/TypeScriptContext";

export class TypeScriptContextResolverFacet
{
  async resolve(
    context: ContextAsync,
  ): Promise<TypeScriptContext>
  {
    return await resolveTypeScriptContextAsync(context);
  }

  resolveSync(
    context: ContextSync,
  ): TypeScriptContext
  {
    return resolveTypeScriptContextSync(context);
  }
}
