import type { Optional } from "../../lib/object/Optional";
import type { Extension } from "../Extension";

import type { ExtensionFactoryOptions } from "./ExtensionFactoryOptions";

export type ExtensionFactoryAsync<
  T_Extension extends Extension = Extension,
> = (
  options?: Optional<ExtensionFactoryOptions>,
) => Promise<T_Extension>;
