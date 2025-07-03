import { decodeTOMLSync } from "../decodeTOMLSync";

describe(
  "decodeTOMLSync",
  () =>
  {
    it(
      "should decode raw TOML data from a string",
      () =>
      {
        const data = {
          key: "value",
        };

        const encoded = "key = \"value\"";
        const decoded = decodeTOMLSync<typeof data>(encoded);

        expect(decoded).toEqual(data);
      },
    );

    it(
      "should decode raw TOML data from a `Buffer`",
      () =>
      {
        const data = {
          key: "value",
        };

        const raw = "key = \"value\"";
        const encoded = Buffer.from(raw);
        const decoded = decodeTOMLSync<typeof data>(encoded);

        expect(decoded).toEqual(data);
      },
    );
  },
);
