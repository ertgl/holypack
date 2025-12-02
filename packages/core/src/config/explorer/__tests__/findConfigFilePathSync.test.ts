import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createFsFromVolume,
  type DirectoryJSON,
  Volume,
} from "memfs";

import type { ConfigFilePathFinderFSSync } from "../ConfigFilePathFinderFSSync";
import { findConfigFilePathSync } from "../findConfigFilePathSync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "findConfigFilePathSync",
  () =>
  {
    it(
      "should return result with the path to the config file when it exists",
      () =>
      {
        const result = findConfigFilePathSync({
          cwd: __dirname,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(true);
        expect(typeof result.path).toBe("string");
      },
    );

    it(
      "should return result with `found: false` when no config file is found",
      () =>
      {
        const result = findConfigFilePathSync({
          globPattern: `non-existent-config.${Date.now().toString()}.json`,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(false);
        expect(result.path).toBeNull();
      },
    );

    it(
      "should return result with path targeting `package.json` file when it contains the config property",
      () =>
      {
        const packageJSON = {
          holypack: {
            key: "value",
          },
        };

        const cwd = "/project";
        const packageJSONFilePath = `${cwd}/package.json`;

        const entries: DirectoryJSON = {
          [packageJSONFilePath]: JSON.stringify(packageJSON, null, 2),
        };

        const volume = Volume.fromJSON(entries);
        const fs = createFsFromVolume(volume);

        const result = findConfigFilePathSync({
          cwd,
          fs: fs as unknown as ConfigFilePathFinderFSSync,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(true);
        expect(result.path).toBe(packageJSONFilePath);
      },
    );

    it(
      "should eliminate directories from the glob results",
      () =>
      {
        const cwd = "/project";
        const packageJSONFilePath = `${cwd}/package.json`;

        const entries: DirectoryJSON = {
          [`${packageJSONFilePath}/file`]: "",
        };

        const volume = Volume.fromJSON(entries);
        const fs = createFsFromVolume(volume);

        const result = findConfigFilePathSync({
          cwd,
          fs: fs as unknown as ConfigFilePathFinderFSSync,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(false);
      },
    );
  },
);
