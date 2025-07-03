import type { CustomFileSystem } from "../../lib/fs/CustomFileSystem";
import type { Mutex } from "../../lib/mutex/Mutex";
import type { StrictPartial } from "../../lib/object/StrictPartial";
import type { Path } from "../../lib/path/Path";

export type ContextKnownPropertiesBase = {
  cwd: Path;
  fs: StrictPartial<CustomFileSystem>;
  sealed: boolean;
  sealerMutex: Mutex;
  sync: boolean;
};
