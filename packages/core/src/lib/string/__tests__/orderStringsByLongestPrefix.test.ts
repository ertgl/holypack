import { shuffleArrayByReference } from "../../array/__tests__/utils/shuffleArrayByReference";
import { orderStringsByLongestPrefix } from "../orderStringsByLongestPrefix";

describe(
  "orderStringsByLongestPrefix",
  () =>
  {
    const fileNameExtensions = Array.from(
      Object.keys(
        {
          "": true,
          ".d.ts": true,
          ".js": true,
          ".json": true,
          ".jsx": true,
          ".module.css": true,
          ".ts": true,
          ".tsx": true,
        },
      ),
    );

    fileNameExtensions.push(".ts");

    it.each(
      Array.from({
        length: 100,
      }).fill(
        undefined,
        0,
        100,
      ).map(
        (
          value,
          index,
        ) => ({
          iteration: index + 1,
        }),
      ),
    )(
      "should group file name extensions by common prefix alphabetically (asc), and sort the groups by length internally (desc) - iteration $iteration",
      () =>
      {
        fileNameExtensions.reverse();
        shuffleArrayByReference(fileNameExtensions);
        shuffleArrayByReference(fileNameExtensions);
        shuffleArrayByReference(fileNameExtensions);
        shuffleArrayByReference(fileNameExtensions);

        orderStringsByLongestPrefix(fileNameExtensions);

        expect(fileNameExtensions.length).toBe(9);

        expect(fileNameExtensions[0]).toBe(".d.ts");
        expect(fileNameExtensions[1]).toBe(".json");
        expect(fileNameExtensions[2]).toBe(".jsx");
        expect(fileNameExtensions[3]).toBe(".js");
        expect(fileNameExtensions[4]).toBe(".module.css");
        expect(fileNameExtensions[5]).toBe(".tsx");
        expect(fileNameExtensions[6]).toBe(".ts");
        expect(fileNameExtensions[7]).toBe(".ts");
        expect(fileNameExtensions[8]).toBe("");
      },
    );
  },
);
