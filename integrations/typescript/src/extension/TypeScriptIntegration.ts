import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { Path } from "@holypack/core/lib/path/Path";
import type { PathLike } from "@holypack/core/lib/path/PathLike";

import type { TypeScriptContext } from "../context/TypeScriptContext";

import { TSConfigRootFinderFacet } from "./facets/TSConfigRootFinderFacet";
import { TypeScriptContextResolverFacet } from "./facets/TypeScriptContextResolverFacet";
import { INTEGRATION_UID_TYPESCRIPT } from "./INTEGRATION_UID_TYPESCRIPT";
import type { TypeScriptIntegrationFacets } from "./TypeScriptIntegrationFacets";

export class TypeScriptIntegration extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_TYPESCRIPT;

  readonly facets: TypeScriptIntegrationFacets;

  constructor()
  {
    super();

    this.facets = {
      contextResolver: new TypeScriptContextResolverFacet(),
      tsconfigRootFinder: new TSConfigRootFinderFacet(),
    };
  }

  async findTSConfigRootDirectoryPath(
    context: ContextAsync,
    cwdPathLike?: Optional<PathLike>,
  ): Promise<null | Path>
  {
    return await this.facets.tsconfigRootFinder.find(
      context,
      cwdPathLike,
    );
  }

  findTSConfigRootDirectoryPathSync(
    context: ContextSync,
    cwdPathLike?: Optional<PathLike>,
  ): null | Path
  {
    return this.facets.tsconfigRootFinder.findSync(
      context,
      cwdPathLike,
    );
  }

  async resolveContext(
    context: ContextAsync,
  ): Promise<TypeScriptContext>
  {
    return await this.facets.contextResolver.resolve(context);
  }

  resolveContextSync(
    context: ContextSync,
  ): TypeScriptContext
  {
    return this.facets.contextResolver.resolveSync(context);
  }
}
