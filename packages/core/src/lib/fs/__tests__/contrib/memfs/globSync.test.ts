import {
  createFsFromVolume,
  type DirectoryJSON,
  Volume,
} from "memfs";

import type { Dirent } from "../../../dirent/Dirent";

import { globSync } from "./globSync";

describe(
  "globSync",
  () =>
  {
    it(
      "should return an array of file paths matching the glob pattern",
      () =>
      {
        const entries: DirectoryJSON = {
          "/a/b/1.md": "",
          "/a/b/2.txt": "",
        };
        const volume = Volume.fromJSON(entries);
        const fs = createFsFromVolume(volume);

        const result = globSync<Dirent<string>[]>(
          fs,
          ["**/*.txt"],
          {
            cwd: "/",
            withFileTypes: true,
          },
        );

        expect(result).toHaveLength(1);
        expect(result[0].parentPath).toBe("/a/b");
        expect(result[0].name).toBe("2.txt");
      },
    );
  },
);
