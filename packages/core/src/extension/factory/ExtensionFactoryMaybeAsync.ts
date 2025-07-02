import type { Optional } from "../../lib/object/Optional";
import type { MaybePromise } from "../../lib/promise/MaybePromise";
import type { Extension } from "../Extension";

import type { ExtensionFactoryOptions } from "./ExtensionFactoryOptions";

export type ExtensionFactoryMaybeAsync<
  T_Extension extends Extension = Extension,
> = (
  options?: Optional<ExtensionFactoryOptions>,
) => MaybePromise<T_Extension>;
