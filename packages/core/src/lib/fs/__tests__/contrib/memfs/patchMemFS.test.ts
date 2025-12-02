import {
  createFsFromVolume,
  Volume,
} from "memfs";

describe(
  "patchMemFS",
  () =>
  {
    it(
      "glob APIs of memfs without patching should throw `TypeError` when given an array instead of string",
      async () =>
      {
        const fs = createFsFromVolume(new Volume());

        expect(
          () =>
          {
            // @ts-expect-error - Mismatched types.
            fs.globSync(["*"]);
          },
        ).toThrow(
          /argument must be of type string\. Received an instance of Array/u,
        );

        await expect(
          async () =>
          {
            await new Promise(
              (
                resolve,
                reject,
              ) =>
              {
                fs.glob(
                  // @ts-expect-error - Mismatched types.
                  ["*"],
                  null,
                  (
                    err,
                    data,
                  ) =>
                  {
                    if (err != null)
                    {
                      reject(err);
                    }
                    else
                    {
                      resolve(data);
                    }
                  },
                );
              },
            );
          },
        ).rejects.toThrow(
          /argument must be of type string\. Received an instance of Array/u,
        );
      },
    );
  },
);
