import type {
  FsCallbackApi,
  FsSynchronousApi,
// eslint-disable-next-line n/no-extraneous-import, @cspell/spellchecker
} from "@jsonjoy.com/fs-node-utils";

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
