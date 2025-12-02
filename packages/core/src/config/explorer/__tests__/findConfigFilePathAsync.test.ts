import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createFsFromVolume,
  type DirectoryJSON,
  Volume,
} from "memfs";

import type { ConfigFilePathFinderFSAsync } from "../ConfigFilePathFinderFSAsync";
import { findConfigFilePathAsync } from "../findConfigFilePathAsync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "findConfigFilePathAsync",
  () =>
  {
    it(
      "should return result with the path to the config file when it exists",
      async () =>
      {
        const result = await findConfigFilePathAsync({
          cwd: __dirname,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(true);
        expect(typeof result.path).toBe("string");
      },
    );

    it(
      "should return result with `found: false` when no config file is found",
      async () =>
      {
        const result = await findConfigFilePathAsync({
          globPattern: `non-existent-config.${Date.now().toString()}.json`,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(false);
        expect(result.path).toBeNull();
      },
    );

    it(
      "should return result with path targeting `package.json` file when it contains the config property",
      async () =>
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

        const result = await findConfigFilePathAsync({
          cwd,
          fs: fs as unknown as ConfigFilePathFinderFSAsync,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(true);
        expect(result.path).toBe(packageJSONFilePath);
      },
    );

    it(
      "should eliminate directories from the glob results",
      async () =>
      {
        const cwd = "/project";
        const packageJSONFilePath = `${cwd}/package.json`;

        const entries: DirectoryJSON = {
          [`${packageJSONFilePath}/file`]: "",
        };

        const volume = Volume.fromJSON(entries);
        const fs = createFsFromVolume(volume);

        const result = await findConfigFilePathAsync({
          cwd,
          fs: fs as unknown as ConfigFilePathFinderFSAsync,
        });

        expect(result).toBeDefined();
        expect(result.found).toBe(false);
      },
    );
  },
);
