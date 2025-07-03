import type { CustomFileSystem } from "../../lib/fs/CustomFileSystem";
import type { Optional } from "../../lib/object/Optional";
import type { StrictPartial } from "../../lib/object/StrictPartial";

export type ConfigDefinitionBase = {
  [key: string]: unknown;
  fs?: Optional<StrictPartial<CustomFileSystem>>;
};
