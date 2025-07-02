import {
  createFsFromVolume,
  type DirectoryJSON,
  Volume,
} from "memfs";

import type { Dirent } from "../../../dirent/Dirent";

import { globAsync } from "./globAsync";

describe(
  "globAsync",
  () =>
  {
    it(
      "should return an array of file paths matching the glob pattern",
      async () =>
      {
        const entries: DirectoryJSON = {
          "/a/b/1.md": "",
          "/a/b/2.txt": "",
        };
        const volume = Volume.fromJSON(entries);
        const fs = createFsFromVolume(volume);

        const result = await new Promise<Dirent<string>[]>(
          (
            resolve,
            reject,
          ) =>
          {
            globAsync(
              fs,
              ["**/*.txt"],
              {
                cwd: "/",
                withFileTypes: true,
              },
              (
                err,
                dirents,
              ) =>
              {
                if (err)
                {
                  reject(err);
                }
                else
                {
                  resolve(dirents as Dirent<string>[]);
                }
              },
            );
          },
        );

        expect(result).toHaveLength(1);
        expect(result[0].parentPath).toBe("/a/b");
        expect(result[0].name).toBe("2.txt");
      },
    );
  },
);
