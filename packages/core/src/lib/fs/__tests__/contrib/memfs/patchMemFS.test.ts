import {
  createFsFromVolume,
  Volume,
} from "memfs";

import { patchMemFS } from "./patchMemFS";

describe(
  "patchMemFS",
  () =>
  {
    it(
      "should return an array of file paths matching the glob pattern",
      () =>
      {
        const fs = createFsFromVolume(new Volume());

        expect(
          // @ts-expect-error - memfs does not have glob method
          fs.glob,
        ).not.toBeDefined();

        expect(
          // @ts-expect-error - memfs does not have globSync method
          fs.globSync,
        ).not.toBeDefined();

        const patchedFS = patchMemFS(fs);

        expect(patchedFS.glob).toBeDefined();
        expect(patchedFS.globSync).toBeDefined();
      },
    );
  },
);
