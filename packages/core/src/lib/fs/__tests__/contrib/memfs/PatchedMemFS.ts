import type {
  FsCallbackApi,
  FsSynchronousApi,
} from "memfs/lib/node/types";

import type { PatchedWithDefined } from "../../../../object/PatchedWithDefined";

import type { globAsync } from "./globAsync";
import type { globSync } from "./globSync";

export type PatchedMemFS = PatchedWithDefined<
  FsCallbackApi & FsSynchronousApi,
  {
    glob: typeof globAsync;
    globSync: typeof globSync;
  }
>;
