import { extractWorkspaceGlobPatterns } from "../extractWorkspaceGlobPatterns";

describe(
  "extractWorkspaceGlobPatterns",
  () =>
  {
    it(
      "should return empty array if `packageJSON` is null",
      () =>
      {
        const patterns = extractWorkspaceGlobPatterns(null);

        expect(patterns).toStrictEqual([]);
      },
    );

    it(
      "should return empty array if `workspaces` is not defined",
      () =>
      {
        const patterns = extractWorkspaceGlobPatterns({});

        expect(patterns).toStrictEqual([]);
      },
    );

    it(
      "should return `workspaces` when it is defined",
      () =>
      {
        const packageJSON = {
          workspaces: [
            "./packages/*",
          ],
        };

        const patterns = extractWorkspaceGlobPatterns(packageJSON);

        expect(patterns).toStrictEqual(packageJSON.workspaces);
      },
    );
  },
);
